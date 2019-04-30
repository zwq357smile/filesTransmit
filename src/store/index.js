import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let state = {
  token: '',
  history: []
};

// let getters = {
//   printData: state => {
//     console.log(state.a1, state.name, state.data);
//     return state.data;
//   },
//   playState: state => {
//     if (!state.playing) state.src.pause();
//     else state.src.play();
//     return state.playing;
//   }
// };

let mutations = {
  setToken(state, data) {
    state.token = data;
  },
  popState(state) {
    state.history.pop();
  },
  pushState(state, data) {
    state.history.push(data);
  }
};

let actions = {
  setToken({commit}, data) {
    commit('setToken', data);
  },
  popState({commit}) {
    commit('popState');
  },
  pushState({commit}, data) {
    commit('pushState', data);
  }
};

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  actions
  // modules: {
  //   moduleA
  // }
});
