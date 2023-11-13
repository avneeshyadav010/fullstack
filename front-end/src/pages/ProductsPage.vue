<template>
  <NavBar />
  <h1>Products </h1>
  <ProductsList :products_props_var="products" />
</template>

<script>
import ProductsList from '@/components/ProductsList.vue';
import NavBar from '@/components/NavBar.vue'
import axios from 'axios';
export default {
  name: "ProductsPage",
  data() {
    return {
      products: [],
    }
  },
  components: {
    ProductsList,
    NavBar
  },
  async created() {
    let userData = localStorage.getItem('token_ls');
    userData = JSON.parse(userData);
    let token = userData.token;
   const config ={ headers: {  'x-access-token': token} } 
    const response = await axios.get('/api/products', config);
    const products = response.data;
    this.products = products;
  }
}
</script>
 
<style></style>