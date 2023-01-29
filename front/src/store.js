import { createStore } from 'vuex'

export default createStore({
    state () {
      return {
        user: null
      }
    },
    getters: {
      isConnected (state) {
        return !!state.user;
      }
    },
    mutations: {
      connect (state, user) {
        state.user = user;
      },
      disconnect(state) {
        state.user = null;
      }
    }
});