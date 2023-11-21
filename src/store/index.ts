import { InjectionKey } from 'vue'
import { createStore, Store } from "vuex";
import axios from "axios";
import { IUser, IOptions } from '../models'

interface IUsers {
  data: IUser[]
  page: number
  per_page: number
  total: number
  total_pages: number
  support: {
    text: string
    url: string
  }
}


interface IState {
  users: IUsers
}

export const key: InjectionKey<Store<IState>> = Symbol()

export const store = createStore<IState>({
  state: {
    users: [],
  },
  mutations: {
    setUsers(state: IState, payload: IUsers) {
      state.users = payload;
    },
    addUser(state: IState, payload: IUser) {
      if (state.users.data.length < state.users.per_page)
        state.users.data.push(payload);
    },
    editUser(state: IState, payload: IUser) {
      const userFoundIndex = state.users.data.findIndex(user => user.id === payload.id);
      state.users.data[userFoundIndex] = payload;
    },
  },
  getters: {
    getAllUsers(state: IState) {
      return state.users.data || []
    },
    getSelectedPage(state: IState) {
      return state.users.page
    },
    getPerPage(state: IState) {
      return state.users.per_page
    },
    getTotalUsers(state: IState) {
      return state.users.total
    },
  },
  actions: {
    fetchUsers(context: any, options: IOptions) {
      axios
        .get(`https://reqres.in/api/users?page=${options.selectedPage}&per_page=${options.perPage}`)
        .then((response) => {
          context.commit('setUsers', response.data);
        })
    },
    createUser(context: any, user: IUser) {
      axios
        .post('https://reqres.in/api/users', user)
        .then((response) => {
          context.commit('addUser', response.data);
        })
    },
    updateUser(context: any, user: IUser) {
      axios
        .put(`https://reqres.in/api/users/${user.id}`, user)
        .then((response) => {
          context.commit('editUser', response.data);
        })
    },
  },
})