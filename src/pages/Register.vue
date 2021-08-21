<template>
  <ion-page>
    <auth-layout title="Register">
      <ion-content>
        <ion-item class="with-margins" lines="full">
          <ion-label position="floating">Name</ion-label>
          <ion-icon slot="end" :icon="personOutline" class="pointer-cursor ion-margin-top" color="primary"
                    required></ion-icon>
          <ion-input v-model="name" type="text" required></ion-input>
        </ion-item>
        <ion-item class="with-margins" lines="full">
          <ion-label position="floating">Email</ion-label>
          <ion-icon class="pointer-cursor ion-margin-top" slot="end" :icon="mailOutline" color="primary"></ion-icon>
          <ion-input v-model="email" type="email" required></ion-input>
        </ion-item>
        <ion-item class="with-margins" lines="full">
          <ion-label position="floating">Password</ion-label>
          <ion-icon @click="isPwd = !isPwd" class="pointer-cursor ion-margin-top" slot="end"
                    :icon="isPwd ? eyeOffOutline: eyeOutline"
                    color="primary"></ion-icon>
          <ion-input v-model="password" :type="isPwd? 'password' : 'text'" required>
          </ion-input>
        </ion-item>
        <ion-row class="with-margins">
          <ion-col>
            <ion-button @click="register" shape="round" color="primary" expand="block">Register</ion-button>
          </ion-col>
        </ion-row>
      </ion-content>
    </auth-layout>
  </ion-page>
</template>

<script>
import {IonButton, IonCol, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow} from '@ionic/vue'
import AuthLayout from '../components/layout/AuthLayout.vue'
import {eyeOffOutline, eyeOutline, mailOutline, personOutline} from "ionicons/icons";
import {mapActions} from "vuex";
import {SpinnerDialog} from '@ionic-native/spinner-dialog';
import {Dialogs} from '@ionic-native/dialogs'
import axios from 'axios'
import router from "@/router";
import ShoppingListContributor from "@/model/shoppingListContributor";

export default {
  name: "Register",
  components: {
    IonPage, IonIcon, IonItem, IonRow, IonCol, IonContent, IonButton, IonInput, IonLabel, AuthLayout
  },
  data() {
    return {
      email: '',
      password: '',
      name: '',
      isPwd: true
    }
  },
  methods: {
    ...mapActions('lists', ['addContributor']),
    ...mapActions('auth', ['registerUser']),

    handleLocalRegistration(firebaseResponse){
      axios.post('/api/users', {id: firebaseResponse.user.uid, name: this.name, email: this.email})
          .then(() => {
            if(this.$route.query.signUpFromEmail){
              const listId = this.$route.query.listId
              let contributor = new ShoppingListContributor(listId, firebaseResponse.user.uid)
              this.addContributor(contributor)
            }
            SpinnerDialog.hide()
            router.push("/home")
          }).catch(() => {
        Dialogs.alert("Something went wrong", "Error", "Ok")
        SpinnerDialog.hide()
      })
    },

    register() {
      SpinnerDialog.show();
        this.registerUser({email: this.email, password: this.password, name: this.name})
            .then(response => {
              this.handleLocalRegistration(response)
            }).catch(error => {
          Dialogs.alert(error.message, "Error", "Ok")
          SpinnerDialog.hide()
        })
    }
  },
  setup() {
    return {
      eyeOffOutline, eyeOutline, mailOutline, personOutline
    }
  }
}
</script>

<style scoped>
.with-margins {
  margin: 16px 16px 16px 16px;
}
</style>