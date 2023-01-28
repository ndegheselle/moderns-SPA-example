import { createStore } from 'vuex'

export default createStore({
    state () {
      return {
        user: null
      }
    },
    mutations: {
      connect (state, user) {
        state.user = user;
      }
    }
});