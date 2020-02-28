// yarn add vuex@next -S
import { createStore } from 'vuex'
import { setItem, getItem } from '../utils/storage'
const TOKEN_KEY = 'TOUTIAO_USER'
const store = createStore({
    state: {
        user: getItem(TOKEN_KEY)
    },
    mutations: {
        setUser(state, data) {
            state.user = data
            setItem(TOKEN_KEY, state.user)
        }
    }
})
export default store
