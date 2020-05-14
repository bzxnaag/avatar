<template>
  <div class="home">
    <h4>nyawa sendiri: {{nyawa}}</h4>
    <h4>nyawa musuh  : {{nyawaMusuh || 10}}</h4>
    <form>
      <input type="radio" value="fire" v-model="element">
      <label for="">fire</label>
      <input type="radio" value="water" v-model="element">
      <label for="">water</label>
      <input type="radio" value="earth" v-model="element">
      <label for="">earth</label>
      <input type="radio" value="wind" v-model="element">
      <label for="">wind</label>
      <button v-if="attack" @click.prevent="attacking">Attack</button>
      <button v-else @click.prevent="defense">Defense</button>
    </form>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3000')

export default {
  name: 'Home',
  data(){
    return {
      nyawa: 10,
      nyawaMusuh: null,
      attack: true,
      element: null,
      outsideElement: null
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
  },
  mounted(){
    socket.on('enemy attacking', element => {
      this.outsideElement = element
    })
    socket.on('nyawa musuh', nyawa => {
      this.nyawaMusuh = nyawa
    })
  },
  methods: {
    attacking(){
      if(this.element){
        console.log(this.element)
        socket.emit('attack', this.element)
        this.element = null
        this.attack = false
      }
    },
    defense(){
      if(this.element&&this.outsideElement){
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
        this.attack = true
      } else if(this.element&&!this.outsideElement){
        console.log('enemy not attacking yet')
      } else {
        console.log('input your element defense')
      }
    }
  },

}
</script>
