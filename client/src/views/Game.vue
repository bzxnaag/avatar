<template>
  <div class="game">
    <div class="players">
      <div class="player you">
        <h4>{{name1}} (You)</h4>
        <progress :value="nyawa" max="10"></progress>
        <img style="width: 40%; margin: 2rem;" :src="img1">
      </div>
      <div class="player enemy">
        <h4>{{name2}} (Enemy)</h4>
        <progress :value="nyawaMusuh || 10" max="10"></progress>
        <img style="width: 40%; margin: 2rem;" :src="img2">
      </div>
    </div>
    <div class="control">
      <h4>{{status}}</h4>
      <div class="input">
        <div class="element">
          <img src="https://vignette.wikia.nocookie.net/avatar/images/4/4b/Firebending_emblem.png/revision/latest?cb=20130729203233" v-if="attack" @click.prevent="attacking('fire')">
          <img src="https://vignette.wikia.nocookie.net/avatar/images/4/4b/Firebending_emblem.png/revision/latest?cb=20130729203233" v-else @click.prevent="defense('fire')">
        </div>
        <div class="element">
          <img src="https://vignette.wikia.nocookie.net/avatar/images/8/82/Airbending_emblem.png/revision/latest?cb=20130729210446" v-if="attack" @click.prevent="attacking('wind')">
          <img src="https://vignette.wikia.nocookie.net/avatar/images/8/82/Airbending_emblem.png/revision/latest?cb=20130729210446" v-else @click.prevent="defense('wind')">
        </div>
        <div class="element">
          <img src="https://vignette.wikia.nocookie.net/avatar/images/e/e4/Earthbending_emblem.png/revision/latest?cb=20130729200732" v-if="attack" @click.prevent="attacking('earth')">
          <img src="https://vignette.wikia.nocookie.net/avatar/images/e/e4/Earthbending_emblem.png/revision/latest?cb=20130729200732" v-else @click.prevent="defense('earth')">
        </div>
        <div class="element">
          <img src="https://vignette.wikia.nocookie.net/avatar/images/5/50/Waterbending_emblem.png/revision/latest?cb=20130729182922" v-if="attack" @click.prevent="attacking('water')">
          <img src="https://vignette.wikia.nocookie.net/avatar/images/5/50/Waterbending_emblem.png/revision/latest?cb=20130729182922" v-else @click.prevent="defense('water')">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3000')

export default {
  name: 'Home',
  data(){
    return {
      nyawa: 8,
      nyawaMusuh: null,
      element: null,
      outsideElement: null,
      img1: null,
      img2: null,
      name1: null,
      name2: null
    }
  },
  created(){
    socket.emit('nyawa', this.nyawa)
    socket.on('nyawa musuh', nyawa => {
      this.nyawaMusuh = nyawa
    })
    socket.on('masuk room', string => {
      console.log(string)
    })
    if(localStorage.name == player1name){
      this.$store.commit('setAttack', true)
      name1 = player1name
      name2 = player2name
      img1 = this.$store.state.player1.img
      img2 = this.$store.state.player2.img
    } else {
      this.$store.commit('setAttack', false)
      name1 = player2name
      name2 = player1name
      img1 = this.$store.state.player2.img
      img2 = this.$store.state.player1.img
    }
  },
  computed: {
    status(){
      if(this.attack) return 'ATTACKING'
      else return 'DEFENSE'
    },
    player1name(){
      return this.$store.state.player1.name
    },
    player2name(){
      return this.$store.state.player2.name
    },
    attack(){
      return this.$store.state.attack
    }
  },
  watch: {
    nyawa(){
      if(this.nyawa <= 0){
        this.nyawa = 0
        console.log('player kalah')
        Swal.fire({
        icon: 'danger',
        title: 'Anda Kalah',
        showConfirmButton: false,
        timer: 1500
      })
      socket.emit('kalah')
      }
    }
  },
  mounted(){
    socket.on('enemy attacking', element => {
      this.outsideElement = element
    })
    socket.on('nyawa musuh', nyawa => {
      this.nyawaMusuh = nyawa
    })
    socket.on('menang', () => {
      Swal.fire({
      icon: 'success',
      title: 'Selamat Anda Menang',
      showConfirmButton: false,
      timer: 1500
    })
    })
  },
  methods: {
    defense(element){
      this.element = element
      if(this.outsideElement){
        if(this.element==='fire'){
          switch(this.outsideElement){
            case 'fire':
              this.nyawa-=0
              break
            case 'wind':
              this.nyawa-=1
              break
            case 'earth':
              this.nyawa-=0
              break
            case 'water':
              this.nyawa-=2
              break
          }
        }
        if(this.element==='wind'){
          switch(this.outsideElement){
            case 'fire':
              this.nyawa-=1
              break
            case 'wind':
              this.nyawa-=0
              break
            case 'earth':
              this.nyawa-=2
              break
            case 'water':
              this.nyawa-=0
              break
          }
        }
        if(this.element==='earth'){
          switch(this.outsideElement){
            case 'fire':
              this.nyawa-=2
              break
            case 'wind':
              this.nyawa-=0
              break
            case 'earth':
              this.nyawa-=0
              break
            case 'water':
              this.nyawa-=1
              break
          }
        }
        if(this.element==='water'){
          switch(this.outsideElement){
            case 'fire':
              this.nyawa-=0
              break
            case 'wind':
              this.nyawa-=2
              break
            case 'earth':
              this.nyawa-=1
              break
            case 'water':
              this.nyawa-=0
              break
          }
        }
        this.outsideElement = null
        this.element = null
        socket.emit('nyawa', this.nyawa)
        this.$store.commit('setAttack', true)
      } else {
        console.log('enemy not attacking yet')
      }
  },
  attacking(element){
    this.element = element
    console.log(this.element)
    socket.emit('attack', this.element)
    this.element = null
    this.$store.commit('setAttack', false)
    }
  }
}
</script>

<style scoped>
  .game {
    display: grid;
    grid-template-rows: 3fr 1fr;
    height: 100vh;
  }
  .players {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .player {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  progress {
  background-color: #eee;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
  width: 50%;
  height: 4%;
  }
  .control{
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .input {
    display: flex;
    justify-content: center;
  }
  .element {
    width: 10%;
    margin: 1rem;
  }
  img {
    width: 100%;
  }
</style>
