<template>
<div>
  <b-button @click="modalShow = !modalShow">Input Player Name</b-button>
  <b-modal v-model='modalShow' class='modalz'>
    <form @submit.prevent="confirmLogin">
        <div>
            <h1>Player's Name </h1><input type = 'text' v-model = 'player'> <button class= "btn-a" type = 'submit'> submit </button>
        </div>
    </form >
    
  </b-modal>
</div>
</template>

<script>

import axios from 'axios';
import Vuex from 'vuex';


export default {
  name: 'Login',
  props:{
  },
  data() {
    return {
      id:'',
      player: '',
      modalShow: true
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
      this.onDataLogin({ name: this.player });
      ///// input nama player disini //////
    },
    onDataLogin(valueLogin) {
      console.log(valueLogin)
      axios({
        method: 'post',
        url: 'http://localhost:3000/players',
        data: valueLogin,
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('id', data.id)
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