<template>
  <ion-header translucent>
    <ion-toolbar>
      <ion-title>Location</ion-title>
      <ion-buttons slot="start">
        <ion-button @click="dismiss()">
          <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content fullscreen>
    <add-location-input/>
  </ion-content>
</template>

<script>
import AddLocationInput from "@/components/AddLocationInput";
import {closeOutline} from 'ionicons/icons'
import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, modalController} from "@ionic/vue";

export default {
  name: "AddLocationModal",
  components: {
    AddLocationInput, IonHeader, IonToolbar, IonIcon,
    IonTitle, IonButton, IonButtons, IonContent
  },
  methods: {
    dismiss() {
      modalController.dismiss()
    }
  },
  setup() {
    return {
      closeOutline
    }
  }
}
</script>

<style scoped>

</style>