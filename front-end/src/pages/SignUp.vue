<template>
  <div class="container">
    <div class="form_div">
      <form>
        <div>
          <div class="row">
            <label for="name">Name</label><br><br>
            <input type="text" id="name" placeholder="Enter Your Name" name="Name" v-model="form.name" />
          </div>
          <div class="row">
            <label for="email">Email</label><br><br>
            <input type="text" id="email" placeholder="Enter Your Email" name="Email" v-model="form.email" />
          </div>
          <div class="row">
            <label for="password">Password</label><br><br>
            <input type="password" id="password" placeholder="Enter Your Password" name="Passowrd"
              v-model="form.password" />
          </div>
          <div class="row_button">
            <input type="button" v-on:click="signUp" class="button" value="Sign Up">
          </div>
        </div>

      </form>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import emailjs from 'emailjs-com';
// import axios from 'axios'
export default {
  name: "SignUp",
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async signUp() {
      //  console.warn("Sign--Up",this.form.name,this.form.email,this.form.password);
      if (this.form.name.length > 0 && this.form.email.length > 0 && this.form.password.length > 0) {
        var _data = { username: this.form.name, email: this.form.email, password: this.form.password }
        //  console.log(_data);
        await axios.post('http://localhost:8082/api/sign-up', _data)
          .then(
            response => {
              let userPlustoken = {
                token: response.data.token,
                user_id: response.data.user.email
              }
              localStorage.setItem("token_ls", JSON.stringify(userPlustoken));
              console.log("Befor email")
              var templateParams = {
                from_name: "E-Commerce",
                name: this.form.name,
                email: this.form.email,
                message: "MY E-Commerce"
              }
              emailjs.send('service_jxxn697', 'template_wbcjj4n', templateParams, 'pYmxdX68Chfp4DT9T')
                .then(function (response) {
                  if (response.status == 200)
                    console.log('Registration Email Send SUCCESSFULLY!', response.status, response.text);
                  else
                    console.log("Failed To Send REgistration Email")
                });
              console.log("After Email")
              alert("Successfully Logged-In");
              this.$router.push('/');
            }
          ).catch(function (error) {
            console.log(error.response.data.message);
          });
        //     let userPlustoken = {
        //       token: response.data.token,
        //       user_id: response.data.user.email
        //     }
        //     localStorage.setItem("token_ls", JSON.stringify(userPlustoken));
        //  //   localStorage.setItem("token_ls", response.data.token);
        //     console.log(response);
        // console.log(localStorage.getItem("token_ls"));
        //  if (response.status == 201) {
        //   this.$router.push('/products');
        // }
        // else {
        //   this.$router.push('/');
        // }

        // console.log(result);
        // if (result.status == 201) {
        //   localStorage.setItem("User-Data", JSON.stringify(result.data))
        //   this.$router.push('/products')
        // }
        // else {
        //   this.$router.push('/sign-up');
        //   console.log("API Error");

        // }
      }
      else {
        console.log("Error : Any input field is empty");
        alert("Enter Below Details")
        this.$router.push('/sign-up');


      }


    }


  },
  // mounted() {
  //   let user = localStorage.getItem('User-Data')
  //   console.log("User Dtails -Sign-up:", user);
  //   if (user) {
  //     this.$router.push('/products')
  //   }
  // }
}
</script>



<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: grey;
  padding: 0 10rem;
  height: 100vh;
  border-radius: 10px;
}


label {
  color: white;
  font-size: large;
}

input {
  border-radius: 1rem;
  background-color: transparent;
  height: 2.5rem;
  width: 30rem;
  border: 0.05rem solid whitesmoke;
  color: whitesmoke;
  font-size: medium;
}

.row {
  margin-bottom: 1rem;
  text-align: left;
}

.button {
  background-color: whitesmoke;
  border: none;
  border-radius: 1rem;
  height: 2.5rem;
  width: 10rem;
  color: green;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: medium;
  cursor: pointer;

}

.row_button {
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

::placeholder {
  color: whitesmoke;
  opacity: 1;
}

.form_div {
  margin: 1rem;

}

@media screen and (max-width: 600px) {
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5rem 20rem;


  }
}
</style>
