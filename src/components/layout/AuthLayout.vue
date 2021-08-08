<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-back-button defaultHref="home"></ion-back-button>
      </ion-buttons>
      <ion-title class="ion-text-center">{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <slot/>
</template>

<script>
import {IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar} from "@ionic/vue";

export default {
  name: "AuthLayout",
  components: {IonHeader, IonToolbar, IonButtons, IonTitle, IonBackButton},
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>