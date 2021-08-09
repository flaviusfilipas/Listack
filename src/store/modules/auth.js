/* eslint-disable */
import {auth} from '@/firebase'
import {Storage} from "@capacitor/storage";

const state = () => ({
    loggedIn: false
})
const actions = {
    registerUser({}, payload) {
        return auth.createUserWithEmailAndPassword(payload.email, payload.password)
    },
    loginUser({}, payload){
        return auth.signInWithEmailAndPassword(payload.email,payload.password);
    },
    logoutUser(){
        return auth.signOut()
    },
    handleAuthStateChange ({ commit }) {
        auth.onAuthStateChanged(user => {
            if (user) {
                commit('setLoggedIn', true)
                Storage.set({key:'loggedIn',value:'true'}).catch(error =>{
                    console.log("Could not set loggedIn ",error);
                })
                Storage.set({key:'userId',value:user.uid}).catch(error =>{
                    console.log("Could not set userId ",error);
                })
            } else {
                commit('setLoggedIn', false)
                Storage.set({key:'loggedIn',value:'false'}).catch(error =>{
                    console.log("Could not set loggedIn",error);
                })
                Storage.set({key:'userId',value:''}).catch(error =>{
                    console.log("Could not set userId ",error);
                })
            }
        })
    },
}
const mutations = {
    setLoggedIn(state,value){
        state.loggedIn=value;
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