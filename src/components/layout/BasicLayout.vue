<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-buttons slot="end">
        <ion-button v-if="!loggedIn" router-link='/login'>
          <div class="button-container">
            <ion-icon :icon="personCircleOutline"></ion-icon>
            <ion-label>Login</ion-label>
          </div>
        </ion-button>
        <ion-button v-else>
          <div class="button-container">
            <ion-icon :icon="personCircleOutline"></ion-icon>
            <ion-label>Logout</ion-label>
          </div>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
    <slot/>
</template>

<script>
import {  IonHeader, IonToolbar, IonLabel, IonButton, IonButtons, IonIcon } from '@ionic/vue'
import { personCircleOutline } from 'ionicons/icons';

export default {
  components:{  IonHeader, IonToolbar, IonLabel, IonButton, IonButtons, IonIcon},
  data () {
    return {
      loggedIn: false
    }
  },
  setup() {
    return {personCircleOutline}
  }
}
</script>

<style scoped>
.button-container{
  display: grid;
  grid-template-rows: 70% 30% ;
  justify-items: center;
}
ion-icon{
  font-size:1.5em
}
</style>