import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    users: [],
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    addUser(state, payload) {
      state.users.data.push(payload);
    },
    editUser(state, payload) {
      const userFoundIndex = state.users.data.findIndex(user => user.id === payload.id);
      state.users.data[userFoundIndex] = payload;
    },
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
    },
    createUser(context, user) {
      axios
        .post('https://reqres.in/api/users', user)
        .then((response) => {
          context.commit('addUser', response.data);
        })
    },
    updateUser(context, user) {
      axios
        .put(`https://reqres.in/api/users/${user.id}`, user)
        .then((response) => {
          context.commit('editUser', response.data);
        })
    },
  },
})

export default store;