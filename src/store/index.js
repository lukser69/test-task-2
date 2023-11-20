import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    users: [],
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    }
  },
  getters: {
    getAllUsers(state) {
      return state.users.data || []
    },
    getSelectedPage(state) {
      return state.users.page
    },
    getPerPage(state) {
      return state.users.per_page
    },
    getTotalUsers(state) {
      return state.users.total
    },
  },
  actions: {
    fetchUsers(context, options) {
      axios
        .get(`https://reqres.in/api/users?page=${options.selectedPage}&per_page=${options.perPage}`)
        .then((response) => {
          context.commit('setUsers', response.data);
        })
    }
  },
})

export default store;