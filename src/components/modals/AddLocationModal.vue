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
    <hr/>
    <div v-if="currentList.location !== null">
      <ion-label class="ion-padding-start">Location</ion-label>
      <location-item :currentList="currentList"/>
    </div>
  </ion-content>
</template>

<script>
import AddLocationInput from "@/components/AddLocationInput";
import {closeOutline} from 'ionicons/icons'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonTitle,
  IonToolbar,
  modalController
} from "@ionic/vue";
import LocationItem from "@/components/LocationItem";
import {mapState} from "vuex";

export default {
  name: "AddLocationModal",
  components: {
    LocationItem,
    AddLocationInput, IonHeader, IonToolbar, IonIcon,
    IonTitle, IonButton, IonButtons, IonContent, IonLabel
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
  },
  computed: {
    ...mapState('lists', ['currentList'])
  }
}
</script>

<style scoped>

</style>