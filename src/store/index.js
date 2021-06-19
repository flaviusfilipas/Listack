import {createStore} from 'vuex'
const store = createStore({
  state () {
    return {
      shoppingItems:[
       {
          'id':1,
          'isCompleted':false,
          'text':'Lamai',
          'listId':1
        },
        {
          'id':2,
          'isCompleted':false,
          'text':'Apa',
          'listId':1
        },
        {
          'id':3,
          'isCompleted':false,
          'text':'Mancare pisici',
          'listId':1
        }
      ],
    }
  },
  actions: {
    updateListItem({commit}, payload){
      commit('updateListItem', payload)
    },
  },
  mutations: {
    updateListItem(state,payload){
      Object.assign(state.shoppingItems[payload.index], payload.updates)
    },
    checkItem(state, itemId){
      const item = state.shoppingItems.find(item => item.id === itemId)
      item.isCompleted = true
    },
    unCheckItem(state, itemId){
      const item = state.shoppingItems.find(item => item.id === itemId)
      item.isCompleted = false
    }
  },
  getters: {
  }
})
export default store