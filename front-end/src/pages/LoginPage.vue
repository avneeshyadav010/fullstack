<template>
  <div class="container">
    <div class="form_div">
      <form>
        <div>

          <div class="row">
            <label for="email">Email</label><br><br>
            <input type="text" id="email" placeholder="Enter Your Email" name="Email" v-model="email" />
          </div>
          <div class="row">
            <label for="password">Password</label><br><br>
            <input type="password" id="password" placeholder="Enter Your Password" name="Passowrd" v-model="password" />
          </div>
          <div class="row_button">
            <input type="button" v-on:click="login" class="button" value="Login">
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

export default {
  name: "LoginPage",
  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods:
  {
    async login() {

      if (this.email.length > 0 && this.password.length > 0) {
        var _data = { email: this.email, password: this.password }
        // const response = await axios.post('http://localhost:8081/api/welcome',_data);
        // console.log(response.data);
        await axios.post('http://localhost:8082/api/login', _data)
          .then(
            response => {
             
              const userId = response.data.user.email;
              let userPlustoken = {
                token: response.data.token,
                user_id: userId
              }
              localStorage.setItem("token_ls", JSON.stringify(userPlustoken));
              console.log(response);
              console.log(localStorage.getItem("token_ls"));

              // if (response.status == 200) {
              this.$router.push('/products');
              // }
            }).catch(function (error) {
              console.log(error.response.data.message);
            });


        // console.log(response);

        // const userId = response.data.user.email;
        //   let userPlustoken = {
        //     token : response.data.token,
        //     user_id : userId
        //   }
        //     localStorage.setItem("token_ls", JSON.stringify(userPlustoken));
        //       console.log(response);
        //       console.log(localStorage.getItem("token_ls"));

        //     if(response.status == 200){
        //         this.$router.push('/products');
        //     }
        // else if(response.status == 400 || response.status ==404){
        //   alert(response.data);
        //    this.$router.push('/');
        // }
        //     else{
        //       alert(response);
        //     }

        // }
       
      }
       else {
        console.log("Error : Any input field is empty")
        alert("Enter Below Details")
        this.$router.push('/');
      }
    },
    signUp() {
      this.$router.push('/sign-up')
    }
  },
  // mounted() {
  //   let user = localStorage.getItem('User-Data')
  //   console.log("User Details-Login :", user);
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