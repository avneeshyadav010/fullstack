import express, { json } from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Secret_Key = "NOTESAPI"
const url = 'mongodb://0.0.0.0:27017';
const client = new MongoClient(url);


const app = express();
const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:8080',
  methods: 'POST',
  //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));




app.use(express.json()); // allow you to use body inside req i.e req.body

app.use('/images', express.static(path.join(__dirname, '../assets')));
// End Points or REST API  

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, Secret_Key);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};




app.get('/api/products', verifyToken, async (req, res) => {
  await client.connect();
  const db = client.db('fsv-db');
  const products = await db.collection('products').find({}).toArray();
  res.send(products);
})
// Helper Function
async function populateCartIds(ids) {
  await client.connect();
  const db = client.db('fsv-db');
  return Promise.all(ids.map(id => db.collection('products').findOne({ id })));
}

app.get('/api/users/:email/cart', verifyToken, async (req, res) => {
  //res.json(req.params.userId);
  await client.connect();
  const db = client.db('fsv-db');
  const user = await db.collection('users').findOne({ email: req.params.email })
  const populatedCart = await populateCartIds(user.cartItems);
  res.json(populatedCart);
})

app.get('/api/products/:productId', verifyToken, async (req, res) => {
  await client.connect();
  const db = client.db('fsv-db');
  const product = await db.collection('products').findOne({ id: req.params.productId });
  res.json(product);
})

app.post('/api/users/:userName/cart', verifyToken, async (req, res) => {
  await client.connect();
  const db = client.db('fsv-db');
  const userName = req.params.userName;
  const productId = req.body.id;
  await db.collection('users').updateOne({ email: userName }, {
    $addToSet: { cartItems: productId }    // We can use push instead of addToSet but addToSet will add this prod Id id it is not inserted before.If inserted then skip .To avoid duplicacy
  });
  const user = await db.collection('users').findOne({ email: req.params.userName })
  const populatedCart = await populateCartIds(user.cartItems);
  res.json(populatedCart);
})

app.delete('/api/users/:userName/cart/:productId', verifyToken, async (req, res) => {
  await client.connect();
  const db = client.db('fsv-db');
  const userName = req.params.userName
  const productId = req.params.productId;
  await db.collection('users').updateOne({ email: userName }, {
    $pull: { cartItems: productId }    // pull will tell mongodb to remove that productId from cartItems
  });
  const user = await db.collection('users').findOne({ email: req.params.userName })
  const populatedCart = await populateCartIds(user.cartItems);
  res.json(populatedCart);
})

app.post('/api/sign-up', async (req, res) => {
  //Existing User
  //Hashed User
  //User Creation
  //Token Generation
  await client.connect();
  const db = client.db('fsv-db');
  const { username, email, password } = req.body;

  try {
    const existingUser = await db.collection('users').findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exits" })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('users').insertOne({
      email: email,
      username: username,
      password: hashedPassword,
      cartItems: []
    })
    const token = jwt.sign({ email: result.email, id: result._id }, Secret_Key);
    res.status(201).json({ user: result, token: token })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" })
  }

})
app.post("/api/welcome", verifyToken, (req, res) => {
  res.status(200).send("hello");
});
// app.get("/api/user",async (req,res)=> {
//   await client.connect();
//   const db = client.db('fsv-db');
//   const email = req.body;
//   const existingUser = await db.collection('users').findOne({ email: email });
//   res.status(200).json()
// })

app.post('/api/login', async (req, res) => {
  
  await client.connect();
  const db = client.db('fsv-db');


  const { email, password } = req.body;
  
  try {
    const existingUser = await db.collection('users').findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password)
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credential" });
    }
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, Secret_Key);
    res.status(200).json({ user: existingUser, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" })
  }
})

app.listen(8082, () => {
  console.log("Server is listening on port 8082")
})

