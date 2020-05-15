<template>
  <div class='container'>
    <div class="home">
    
    
    <Login
    v-if=!player
    @statusLogin='onLogin'
    ></Login>

    <button v-if=player @click.prevent='onLogout' class=logout> LOGOUT </button>

    <form 
    v-if='statusJoin'
    @submit.prevent='onSubmitRoomName'>
    <div class='container-div'>
        <h3>Make a room </h3><input type = 'text' v-model = 'roomName'> <button class= "btn-a" type = 'submit'> submit </button>
    </div>
    </form>

    <div class='container-room' v-if='statusJoin'>
     <table class="table">
      <thead>
        <tr>
          <th class="tg-0lax">ID</th>
          <th class="tg-0lax">NAME</th>
          <th class="tg-0lax">PLAYER 1</th>
          <th class="tg-0lax">PLAYER 2</th>
          <th class="tg-0lax">ACTION</th>
        </tr>
      </thead>
      <tbody>
            <Room
            v-for ='(room, index) in rooms' :key='index'
            :passingRoom='room' :index='index'
            @joining='onStatusJoin'
            ></Room>
      </tbody>
      </table>
    </div>

    </div>
 
  </div>
</template>

<script>
import axios from 'axios';
import Login from '@/components/Login.vue'
import Room from '@/components/Room.vue'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3000')

export default {
  name: "Home",
  data() {
    return {
      roomName:'',
      rooms: [],
      id:'',
      player: '',
      statusJoin:false,
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
    onLogin(){
      console.log('masuk sini')
      this.statusJoin=true
      localStorage.setItem('statusJoin', this.statusJoin)
      this.checkLocalStorage()
    },
    onLogout(){
      localStorage.setItem('id', '')
      localStorage.setItem('player', '')
      this.statusJoin=false
      localStorage.setItem('statusJoin', this.statusJoin)
      this.checkLocalStorage()
    },
    onSubmitRoomName(){
      this.createRoom(this.roomName)
    },
    createRoom(value) {
      let newRoom = null
      if(this.player==''){
        throw (`input player's name`)
      }
      axios({
        method: 'post',
        url: 'http://localhost:3000/rooms/',
        data: {name:value}
      })
      .then(({data})=>{
        newRoom = data
        newRoom.Players = []
        return axios({
          method: 'put',
          url: 'http://localhost:3000/players/'+`${this.id}`,
          data: {RoomId : data.id}
        })
      })
      .then(({data}) =>{
        console.log(data.name)
        this.$store.commit('setPlayer1name', data.name)
        console.log(this.$store.state.player1.name)
        newRoom.Players.push(data)
        this.rooms.push(newRoom)
        socket.emit('rooms', this.rooms)
        socket.emit('join room', newRoom.name)
        console.log(this.rooms)
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
        this.rooms=data
        console.log(this.rooms)
      })
      .catch(({err})=>{
        console.log(err)
      })
    },
    showModal() {
      let element = this.$refs.modal.$el
      $(element).modal('show')
    },
    onStatusJoin(index){
      if(localStorage.id!=this.rooms[index].Players[0].id){
        this.$store.commit('setPlayer2name', localStorage.player)
        this.rooms[index].Players.push({
          name:this.player,
          id:this.id
        })
        axios({
          method: 'put',
          url: 'http://localhost:3000/players/'+`${this.id}`,
          data: {RoomId : this.rooms[index].id}
        })
        .then(({data}) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
        socket.emit('rooms', this.rooms)
        socket.emit('join room', this.rooms[index].name)
        socket.emit('players full', this.rooms[index].name)
      }
    }
  },
  created() {
    this.checkLocalStorage();
    socket.on('rooms server', rooms => {
      this.rooms = rooms
    })
    if(localStorage.statusJoin) this.statusJoin = localStorage.statusJoin
    this.checkRooms()
  },
  mounted() {
    socket.on('start game', () => {
      this.$router.push('/game')
    })
  }
};
</script>

<style>


body{
  background-image: url("https://www.ecopetit.cat/wpic/mpic/321-3219740_water-air-fire-earth-ether-five-fantasy-elements.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center; 
}

.zoom
{
    zoom: 100%;
}

.logout{
  position:absolute;
  transition: .5s ease;
  top: 4%;
  right: 20%;
}

.container-room{
  position:relative;
  left: 360px;
  top: 250px;
  width: 400px;
  background-color: rgb(70, 70, 70);
}

h3{
  color:cornsilk
}

th{
  color:azure
}
tr{
  color:azure
}



</style>