<template>
  <ion-page>
    <auth-layout title="Register">
      <ion-content>
        <ion-item class="with-margins" lines="full">
          <ion-label position="floating">Name</ion-label>
          <ion-icon class="pointer-cursor ion-margin-top" slot="end" :icon="personOutline" color="primary"></ion-icon>
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
            <ion-button shape="round" color="primary" expand="block">Register</ion-button>
          </ion-col>
        </ion-row>
      </ion-content>
    </auth-layout>
  </ion-page>
</template>

<script>
import {IonPage, IonIcon, IonItem, IonRow, IonCol, IonContent, IonButton, IonInput, IonLabel} from '@ionic/vue'
import AuthLayout from '../components/layout/AuthLayout.vue'
import {eyeOffOutline, eyeOutline, mailOutline,personOutline} from "ionicons/icons";
export default {
  name: "Register",
  components: {
    IonPage, IonIcon, IonItem, IonRow, IonCol, IonContent, IonButton, IonInput, IonLabel, AuthLayout
  },
  data() {
    return {
      email:'',
      password:'',
      name:'',
      isPwd: true
    }
  },
  methods:{

  },
  setup() {
    return {
      eyeOffOutline, eyeOutline, mailOutline,personOutline
    }
  }
}
</script>

<style scoped>
.with-margins {
  margin: 16px 16px 16px 16px;
}
</style>