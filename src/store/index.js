import { createStore } from 'vuex'
import auth from './modules/auth'
import lists from './modules/lists'
const store = createStore({
  modules: {
    auth,
    lists
  },
})
export default store