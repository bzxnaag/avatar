<template>
  <div>
    <form v-if=!this.player @submit.prevent="confirmLogin">
        <div>
            <h3>Player's Name </h3><input type = 'text' v-model = 'player'>
            <button class= "btn-a" type = 'submit'> submit </button>
        </div>
    </form >
    <button v-if=this.player @submit.prevent='confirmLogOut' class= "btn-a"> Logout </button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import axios from 'axios';
import Vuex from 'vuex';
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'Login',
  props:{
  },
  data() {
    return {
      player: '',
    };
  },
  components: {
  },
  methods: {
    checkLocalStorage() {
      if (!localStorage.getItem('player')) {
        this.player = '';
      } else {
        this.player = localStorage.getItem('player');
      }
    },
    confirmLogin() {
      console.log('confirm login');
      this.onDataLogin({ player: this.player });
      ///// input nama player disini //////
    },
    onDataLogin(valueLogin) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/',
        data: valueLogin,
      })
        .then(({ data }) => {
           localStorage.setItem('player', data.name)
            ///// input nama player disini //////
        })
        .catch((err) => {
        });
    },
    confirmLogOut(){
      localStorage.clear();
      this.checkLocalStorage()
    },
    created() {
      this.checkLocalStorage();
    },
  },
};
</script>

<style scoped>
.modalz{
  background-color:blueviolet
}




</style>