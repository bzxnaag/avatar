import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    player1: {
      name: null,
      img: 'https://pngimg.com/uploads/dragon/dragon_PNG84549.png'
    },
    player2: {
      name: null,
      img: 'https://www.freepngimg.com/thumb/dragon/8-2-dragon-png-10.png'
    },
    attack: null
  },
  mutations: {
    setPlayer1name(state, payload) {
      state.player1.name = payload
    },
    setPlayer2name(state, payload) {
      state.player2.name = payload
    },
    setAttack(state, payload){
      state.attack = payload
    }
  },
  actions: {},
  modules: {}
});
