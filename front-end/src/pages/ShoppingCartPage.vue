<template>
  <NavBar />
  <h1>Shopping Cart </h1>
  <div v-if="cartItems.length > 0">
    <ShoppingCartListPage @remove-from-cart="removeFromCart($event)" :products="cartItems" />
    <button class="checkout-button">Proceed tp checkout</button>
  </div>
  <div v-if="cartItems.length === 0">
    <p>Your Current Cart Is Empty</p>
  </div>
</template>

<script>
import ShoppingCartListPage from '@/components/ShoppingCartListPage.vue';
import NavBar from '@/components/NavBar.vue'
import axios from 'axios';
export default {
  name: "ShoppingCartPage",
  data() {
    return {
      cartItems: [],
    }
  },
  methods: {
    async removeFromCart(productId){
      let userData = localStorage.getItem('token_ls');
      userData = JSON.parse(userData);
      let userName = userData.user_id;
       let token = userData.token;
      const config = { headers: { 'x-access-token': token } }
      const response = await axios.delete(`/api/users/${userName}/cart/${productId}`, config);
      const updatedCart = response.data;
      this.cartItems = updatedCart;
    }
  },
  components: {
    ShoppingCartListPage,
    NavBar
  },
  async created() {
    //const userId = localStorage.getItem("token_ls");
    let userData = localStorage.getItem('token_ls');
    userData = JSON.parse(userData);
    let email = userData.user_id;
    let token = userData.token;
    const config = { headers: { 'x-access-token': token } }
    const response = await axios.get(`/api/users/${email}/cart`, config);
    //console.log(response);
     const cartItems = response.data;
  this.cartItems = cartItems;
  }
}
</script>
  
<style></style>