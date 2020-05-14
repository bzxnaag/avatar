<template>
  <div class='container'>
    <div class="home">
    
    
    <Login
    v-if=!statusJoin
    ></Login>

    <form 
    v-if=!statusJoin
    @submit.prevent='onSubmitRoomName'>
    <div class='container-div'>
        <h3>Make a room </h3><input type = 'text' v-model = 'roomName'> <button class= "btn-a" type = 'submit'> submit </button>
    </div>
    </form>

    <Room class='container-room'
    v-for ='(rooms, index) in rooms' :key='index'
    :passingRoom='rooms'
    @statusjoin='onStatusJoin'
    v-if=!statusJoin
    ></Room> 

    </div>
 
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import Login from '@/components/Login.vue'
import Room from '@/components/Room.vue'
// import BattleGround from '@/components/BattleGround.vue'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: "Home",
  data() {
    return {
      roomName:'',
      rooms: [],
      id:'',
      player: '',
      statusJoin:'',
    }
  },
  components: {
    Login,
    Room,
  },
  methods: {
    checkLocalStorage() {
      if (!localStorage.getItem('player')) {
        this.player = '';
      } else {
        this.id = localStorage.getItem('id')
        this.player = localStorage.getItem('player');
      }
    },
    onSubmitRoomName(){
      this.createRoom(this.roomName)
    },
    createRoom(value) {
      if(this.player==''){
        throw ('input players name')
      }
      axios({
        method: 'post',
        url: 'http://localhost:3000/rooms/',
        data: {name:value}
      })
      .then(({data})=>{
        console.log(data)
        return axios({
          method: 'put',
          url: 'http://localhost:3000/players/'+`${this.id}`,
          data: {RoomId : data.id}
        })
      })
      .then(({data}) =>{
        this.rooms.push(data)
        console.log(data)
      })
      .catch(err=>{
        console.log(err)
      })
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
    onStatusJoin(){
      this.statusJoin=true
    }
  },
  created() {
      this.checkLocalStorage();
  },
};
</script>

<style>
body{
  background-image: url("https://i.pinimg.com/originals/6d/24/25/6d24253ef7a13ba68e2e4e8a2ce8931b.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center; 
}

.zoom
{
    zoom: 100%;
}


.container{
  /* background-color: burlywood; */
}

.container-div{
/* background-color: burlywood; */
position:relative;
left: 0px;
top: 200px;

}

.container-room{
  position:relative;
  left: 450px;
  top: 250px;
  width: 200px
}

h3{
  color:cornsilk
}


</style>