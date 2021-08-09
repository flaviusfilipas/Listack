<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-buttons slot="end">
        <header-auth-button></header-auth-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
    <slot/>
</template>

<script>
import {  IonHeader, IonToolbar, IonButtons,  } from '@ionic/vue'
import HeaderAuthButton from "@/components/buttons/HeaderAuthButton";
export default {
  components:{HeaderAuthButton,  IonHeader, IonToolbar, IonButtons},
}
</script>

<style scoped>
</style>