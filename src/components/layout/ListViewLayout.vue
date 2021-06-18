<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-back-button defaultHref="home"></ion-back-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button>
          <ion-icon :icon="personAddOutline"></ion-icon>
        </ion-button>
        <ion-button>
          <ion-icon :icon="locateOutline"></ion-icon>
        </ion-button>
        <ion-button router-link='/login'>
          <div class="button-container">
            <ion-icon class="login-icon" :icon="personCircleOutline"></ion-icon>
            <ion-label>Login</ion-label>
          </div>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <slot/>
</template>

<script>
import {  IonHeader, IonToolbar, IonLabel, IonButton, IonButtons, IonIcon, IonBackButton } from '@ionic/vue'
import { personCircleOutline, personAddOutline, locateOutline } from 'ionicons/icons';
export default {
  name: 'ListViewLayout',
   components:{  IonHeader, IonToolbar, IonLabel, IonButton, IonButtons, IonIcon, IonBackButton},
    setup() {
    return {personCircleOutline, personAddOutline, locateOutline}
  }
}
</script>

<style>
.button-container{
  display: grid;
  grid-template-rows: 70% 30% ;
  justify-items: center;
}
.login-icon{
  font-size:1.5em
}
</style>