<template>
  <div class="nav-bar">
    <div>
    <router-link to="/products" class="product-link">
       <div class="logo-wrap">
          <img :src="logo" />
        </div>
    </router-link>
    </div>
    <div>
    <router-link to="/cart" class="cart-link">
      <button>Shopping Cart</button>
    </router-link>
    </div>
    <div>
     <router-link v-on:click="signOut" to="/" class="sign-out">
        <button>Sign Out</button>
      </router-link>
      </div>
   
  </div>
</template>
<script>
  import logo from '@/assets/logo-hexagon.svg';
  export default {
    name : "NavBar",
    data(){
      return {
        logo,
      }
    },
    methods: {
    signOut() {
      localStorage.removeItem("token_ls");
    }
  }
  }
  
</script>