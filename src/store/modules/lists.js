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
    pendingContributors: []
})
const actions = {
    updateListItem({commit}, payload) {
        commit('updateListItem', payload)
    },
    updateListSimpleAction({}, list){
      return axios.put('/api/shopping-lists', list)
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
    },
    createContributorPendingInvite({commit}, invitation) {
        axios.post("/api/contributor-invitations", invitation)
            .then(response => {
                commit('addPendingContributorInvite', response.data)
            })
    },
    getPendingContributorInvitationsByListId({commit}, listId) {
        return axios.get(`api/contributor-invitations/pending/list/${listId}`)
    },
    sendConfirmationEmails({state}, inviterName) {
        const newPendingInvites = state.pendingContributors.filter(invite => !invite.sentEmail)
        return axios.post("/api/emails/contributor/confirmation", newPendingInvites, {
            params: {
                inviterName: inviterName,
            }
        })
    },
    addContributor({}, newContributor) {
        return axios.post("/api/shopping-list-contributors", newContributor)
    },
    getContributorsByListId({commit}, listId) {
        axios.get(`/api/shopping-list-contributors/list/${listId}`)
            .then(response => {
                commit('populateContributors', response.data)
            }).catch(error => {
            console.log("Could not get active contributors ", error)
        })
    },
    approveContributorInvitation({commit}, payload) {
        axios.put("/api/contributor-invitations/approve", null, {
            params: {
                userId: payload.userId,
                listId: payload.listId
            }
        });
    }
}
const mutations = {
    updateListMutation(state, list){
        let index = state.userLists.findIndex(shoppingList => shoppingList.id === list.id);
        Object.assign(state.userLists[index],list)
    },
    updateListItem(state, payload) {
        Object.assign(state.shoppingItems[payload.index], payload.updates)
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
    },
    populatePendingContributorInvitations(state, invitations) {
        state.pendingContributors = invitations
    },
    deletePendingInvite(state, index) {
        state.pendingContributors.splice(index, 1)
    },
    populateContributors(state, contributors) {
        state.contributors = contributors
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
