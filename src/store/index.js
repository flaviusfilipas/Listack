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
      ]
    }
  },
  actions: {

  },
  mutations: {
  },
  getters: {

  }
})
export default store