/* eslint-disable */
import axios from 'axios'
import {Storage} from "@capacitor/storage";
import UserShoppingList from "@/model/userShoppingList";
import router from "@/router";

const state = () => ({
    userLists: [],
    shoppingItems: [],
    currentList: {},
    contributors: [],
    pendingContributors:[]
})
const actions = {
    updateListItem({commit}, payload) {
        commit('updateListItem', payload)
    },
    updateList({commit}, payload) {
        axios.put('/api/shopping-lists', payload.item)
            .then(response => {
                commit('updateList', payload)
            })
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
    },
    deleteList({}, listId) {
        return axios.delete(`/api/shopping-lists/${listId}`)
    },
    deleteCompletedItems({}, listId) {
        return axios.delete(`/api/tasks/completed/${listId}`)
    }
}
const mutations = {
    updateListItem(state, payload) {
        Object.assign(state.shoppingItems[payload.index], payload.updates)
    },
    addContributor(state, contributor) {
        state.contributors.push(contributor)
    },
    addPendingContributorInvite(state, invite) {
      state.pendingContributors.push(invite)
    },
    updateContributor(state, payload) {
        let contributor = state.contributors.find(contributor => contributor.id === payload.contributor.id)
        if (contributor) {
            contributor = payload.contributor;
        } else {
            state.contributors[payload.index] = payload.contributor
        }
    },
    addItem(state, item) {
        state.shoppingItems.push(item)
    },
    setCurrentList(state, list) {
        state.currentList = list;
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
    },
    updateList(state, payload) {
        state.shoppingItems[payload.index] = payload.item
    },
    deleteList(state, listId) {
        state.userLists = state.userLists.filter(list => list.id !== listId)
    },
    deleteCompletedItems(state, listId) {
        state.shoppingItems = state.shoppingItems.filter(item => item.listId === listId && !item.completed)
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
