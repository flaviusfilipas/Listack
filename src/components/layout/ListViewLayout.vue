<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-back-button defaultHref="home"></ion-back-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button @click="openAddContributorModal()">
          <ion-icon :icon="personAddOutline"></ion-icon>
        </ion-button>
        <ion-button @click="openAddLocationModal()">
          <ion-icon  :icon="locateOutline"></ion-icon>
        </ion-button>
        <header-auth-button></header-auth-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <slot/>
</template>
<script>
import {IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonToolbar, modalController} from '@ionic/vue'
import {locateOutline, personAddOutline} from 'ionicons/icons';
import HeaderAuthButton from "@/components/buttons/HeaderAuthButton";
import AddContributorModal from "@/components/modals/AddContributorModal";
import AddLocationModal from "@/components/modals/AddLocationModal";

export default {
  name: 'ListViewLayout',
  components: {HeaderAuthButton, IonHeader, IonToolbar, IonButton, IonButtons, IonIcon, IonBackButton},
  setup() {
    return {personAddOutline, locateOutline}
  },
  methods: {
    openAddContributorModal() {
      modalController.create({
        component: AddContributorModal
      }).then(modal => modal.present())
    },
    openAddLocationModal(){
      modalController.create({
        component:AddLocationModal
      }).then(modal => modal.present())
    }
  }
}
</script>

<style>

</style>