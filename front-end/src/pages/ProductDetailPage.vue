<template>
  <NavBar />
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageUrl" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button @click="addToCart" class="add-to-cart" v-if="!itemIsInCart">Add to cart</button>
      <button class="grey-button" v-if="itemIsInCart">Item is already in cart</button>
    </div>
  </div>
  <div v-else>  <!-- or you can use v-if="!product" -->
    <NotFoundPage />
  </div>
  
</template>

<script>
import NotFoundPage from './NotFoundPage.vue';
import NavBar from '@/components/NavBar.vue'
import axios  from 'axios';
export default {
  name: "ProductDetailPage",
  data(){
    return {
      product: {},
      cartItems: [],
    }
  },
  computed: {
    // itemIsInCart(){
    //   return this.cartItems.some(item => item.id === this.$route.params.productId);
    // }
  },
  methods:{
    async addToCart(){
      let userData = localStorage.getItem('token_ls');
      userData = JSON.parse(userData);
     let userName = userData.user_id;
      let token = userData.token;
     const config = { headers: { 'x-access-token': token } }
      await axios.post(`/api/users/${userName}/cart`,{id: this.$route.params.productId}, config);
      alert('Item is added Succesfully!');
    }
  },
  components: {
    NotFoundPage,
    NavBar
  },
  async created()
  {
     let userData = localStorage.getItem('token_ls');
    userData = JSON.parse(userData);
    let token = userData.token;
    const config = { headers: { 'x-access-token': token } }
    const response = await axios.get(`/api/products/${this.$route.params.productId}`, config);
    const product = response.data;
    this.product = product;

    // let userData = localStorage.getItem('token_ls');
    // userData = JSON.parse(userData);
    // let userId = userData.user_id;
    
    // const cartResponse = await axios.get(`/api/users/${userId}/cart`);
    // const cartItems = cartResponse.data;
    // this.cartItems = cartItems;
  }
}
</script>
  
<style></style>