import Vue from "nativescript-vue";
import Vuex from "vuex";

Vue.use(Vuex)




export default new Vuex.Store({
  state: {
    favourites: []
  },

  mutations: {
    SET_FAVOURITE(state, payload) {
      state.favourites = state.favourites.concat(payload)
    },

    DELETE_FAVOURITE(state, payload) {
      for(var i = 0; i < state.favourites.length; i++){
        console.log(state.favourites[i], payload)
        if (state.favourites[i].course === payload.course && state.favourites[i].group === payload.group) {
          console.log("deleted")
          state.favourites.splice(i, 1);
        } else {
          console.log("not deleted")
        }
      }
    }
  },


  actions: {
    check_schedule({state}, payload) {
      var isSaved = false
      for(var i = 0; i < state.favourites.length; i++) {
        if (state.favourites[i].course === payload.course && state.favourites[i].group === payload.group) {
          isSaved = true
        }
      }
      return isSaved
    }
  }


})
