import { createStore } from 'vuex'

export default createStore({
    state () {
      return {
        user: null
      }
    },
    getters: {
      isConnected (state) {
        return false;
      }
    },
    mutations: {
      connect (state, user) {
        state.user = user;
      }
    }
});