<template>
  <div class='container'>
    <div class="home">

    <Login
    ></Login>

    <Room
    v-for ='(rooms, index) in rooms' :key='index'
    ></Room>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import Login from '@/components/Login.vue'
import Room from '@/components/Room.vue'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: "Home",
  data() {
    return {
      rooms: [{},{},],
      player: '',
    }
  },
  components: {
    Login,
    Room
  },
  methods: {
    checkLocalStorage() {
      if (!localStorage.getItem('player')) {
        this.player = '';
      } else {
        this.player = localStorage.getItem('player');
      }
    },
    checkRooms() {
      axios({ 
        method: 'get',
        url: 'http://localhost:3000/rooms/',
      })
      .then(({data})=>{
        this.rooms=data.data
      })
      .catch(({err})=>{
        console.log(err)
      })
    },
    showModal() {
      let element = this.$refs.modal.$el
      $(element).modal('show')
    },
    
  },
  created() {
      this.checkLocalStorage();
  },
};
</script>

<style>

.container{
  background-color: yellow;
}



</style>