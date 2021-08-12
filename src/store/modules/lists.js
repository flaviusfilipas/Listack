/* eslint-disable */
import axios from 'axios'
import {Storage} from "@capacitor/storage";
import UserShoppingList from "@/model/userShoppingList";
import router from "@/router";
const state = () => ({
    userLists: [
        {
            'id': 1,
            'name': 'Metro',
        },
        {
            'id': 2,
            'name': 'Selgros'
        },
    ],
        shoppingItems: [
        {
            'id': 1,
            'isCompleted': false,
            'text': 'Lamai',
            'listId': 1
        },
        {
            'id': 2,
            'isCompleted': false,
            'text': 'Apa',
            'listId': 1
        },
        {
            'id': 3,
            'isCompleted': false,
            'text': 'Mancare pisici',
            'listId': 2
        }
    ]
})
const actions = {
    updateListItem ({ commit }, payload) {
        commit('updateListItem', payload)
    },
    getUserLists({commit}){
        Storage.get({key:"userId"}).then(response=>{
            axios.get(`/api/shopping-lists/user/${response.value}`)
                .then(response=>{
                    commit('populateUserLists',response.data)
                })
        })
    },
    createUserList({commit}){
        Storage.get({key:"userId"}).then(response=>{
            axios.post(`/api/shopping-lists`, new UserShoppingList(response.value))
                .then(response=>{
                    commit('createList',response.data)
                    router.push(`/list/${response.data.id}`)
                })
        })
    },
    createOrUpdateListItem({commit}, payload){
        if(payload.item.id !== null){
           axios.put("/api/tasks/",payload.item)
               .then(response => {
                   payload.item = response.data
                   commit('updateItem',payload);
               })
        }else {
            axios.post("/api/tasks/", payload.item)
                .then(response => {
                    payload.item = response.data
                    commit('updateItem',payload)
                })
        }
    },
    getItemsByListId({commit}, listId){
        axios.get(`/api/tasks/list/${listId}`)
            .then(response=>{
                commit("populateListItems", response.data)
            })
    },
}
const mutations= {
    updateListItem (state, payload) {
        Object.assign(state.shoppingItems[payload.index], payload.updates)
    },
    handleItemCheck (state, itemId) {
        const item = state.shoppingItems.find(item => item.id === itemId)
        item.isCompleted = !item.isCompleted
    },
    checkItem (state, itemId) {
        const item = state.shoppingItems.find(item => item.id === itemId)
        item.isCompleted = true
    },
    unCheckItem (state, itemId) {
        const item = state.shoppingItems.find(item => item.id === itemId)
        item.isCompleted = false
    },
    addItem (state, item) {
        state.shoppingItems.push(item)
    },
    updateItem(state, payload){
        let item = state.shoppingItems.find(item => item.id === payload.item.id)
        if(item) {
            item = payload.item;
        }else{
             state.shoppingItems[payload.index] = payload.item;
        }
        },
    createList (state, list) {
        state.userLists.push(list)
    },
    populateUserLists(state, response){
        state.userLists = response
    },
    populateListItems(state, response){
        state.shoppingItems = response;
    }
}
const getters ={
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}
