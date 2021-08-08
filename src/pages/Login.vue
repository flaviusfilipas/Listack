<template>
  <ion-page>
    <auth-layout title="Login">
      <ion-content>
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
        <div class="with-margins forgot-password">
          <span style="color: #cf3c4f" class="pointer-cursor">Forgot password?</span>
        </div>
        <ion-row class="with-margins">
          <ion-col>
            <ion-button shape="round" color="primary" expand="block">Login</ion-button>
          </ion-col>
        </ion-row>
        <div class="sign-up-container with-margins">
          <h6>Don't have an account yet?</h6>
          <ion-button router-link='/register' fill="clear">Sign up</ion-button>
        </div>
      </ion-content>
    </auth-layout>
  </ion-page>
</template>

<script>
import {IonPage, IonIcon, IonItem, IonRow, IonCol, IonContent, IonButton, IonInput, IonLabel} from '@ionic/vue'
import AuthLayout from '../components/layout/AuthLayout.vue'
import {eyeOffOutline, eyeOutline, mailOutline} from "ionicons/icons";
export default {
  name: 'Login',
  components: {
    IonPage, IonIcon, IonItem, IonRow, IonCol, IonContent, IonButton, IonInput, IonLabel, AuthLayout
  },
  data() {
    return {
      email:'',
      password:'',
      isPwd: true
    }
  },
  methods:{

  },
  setup() {
    return {
      eyeOffOutline, eyeOutline, mailOutline
    }
  }
}
</script>

<style>
.with-margins {
  margin: 16px 16px 16px 16px;
}

.pointer-cursor {
  cursor: pointer;
}

.sign-up-container {
  display: grid;
  grid-template-rows: 50% 50%;
  justify-items: center;
}

.forgot-password {
  text-align: right;
  font-size: smaller;
}
</style>