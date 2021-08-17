/* eslint-disable */
import axios from 'axios'
import {Storage} from "@capacitor/storage";
import UserShoppingList from "@/model/userShoppingList";
import router from "@/router";

const state = () => ({
    userLists: [],
    shoppingItems: []
})
const actions = {
    updateListItem({commit}, payload) {
        commit('updateListItem', payload)
    },
    getUserLists({commit}) {
        Storage.get({key: "userId"}).then(response => {
            axios.get(`/api/shopping-lists/user/${response.value}`)
                .then(response => {
                    commit('populateUserLists', response.data)
                })
        })
    },
    createUserList({commit}) {
        Storage.get({key: "userId"}).then(response => {
            axios.post(`/api/shopping-lists`, new UserShoppingList(response.value))
                .then(response => {
                    commit('createList', response.data)
                    router.push(`/list/${response.data.id}`)
                })
        })
    },
    createOrUpdateListItem({commit}, payload) {
        if (payload.item.id !== null) {
            axios.put("/api/tasks/", payload.item)
                .then(response => {
                    payload.item = response.data
                    commit('updateItem', payload);
                })
        } else {
            axios.post("/api/tasks/", payload.item)
                .then(response => {
                    payload.item = response.data
                    commit('updateItem', payload)
                })
        }
    },
    getItemsByListId({commit}, listId) {
        axios.get(`/api/tasks/list/${listId}`)
            .then(response => {
                commit("populateListItems", response.data)
            })
    },
    deleteTask({commit}, itemId) {
        axios.delete(`/api/tasks/${itemId}`)
            .then(() => {
                commit("deleteTask", itemId)
            })
    }
}
const mutations = {
    updateListItem(state, payload) {
        Object.assign(state.shoppingItems[payload.index], payload.updates)
    },
    handleItemCheck(state, itemId) {
        const item = state.shoppingItems.find(item => item.id === itemId)
        item.isCompleted = !item.isCompleted
    },
    checkItem(state, itemId) {
        const item = state.shoppingItems.find(item => item.id === itemId)
        item.isCompleted = true
    },
    unCheckItem(state, itemId) {
        const item = state.shoppingItems.find(item => item.id === itemId)
        item.isCompleted = false
    },
    addItem(state, item) {
        state.shoppingItems.push(item)
    },
    updateItem(state, payload) {
        let item = state.shoppingItems.find(item => item.id === payload.item.id)
        if (item) {
            item = payload.item;
        } else {
            state.shoppingItems[payload.index] = payload.item
        }
    },
    deleteTask(state, itemId) {
        state.shoppingItems = state.shoppingItems.filter(item => item.id !== itemId)
    },
    createList(state, list) {
        state.userLists.push(list)
    },
    populateUserLists(state, response) {
        state.userLists = response
    },
    populateListItems(state, response) {
        state.shoppingItems = response;
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
