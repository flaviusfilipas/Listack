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
        <ion-button>
          <ion-icon :icon="locateOutline"></ion-icon>
        </ion-button>
        <header-auth-button></header-auth-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <slot/>
</template>

<script>
import {IonHeader, IonToolbar, IonButton, IonButtons, IonIcon, IonBackButton, modalController} from '@ionic/vue'
import {personAddOutline, locateOutline} from 'ionicons/icons';
import HeaderAuthButton from "@/components/buttons/HeaderAuthButton";
import AddContributorModal from "@/components/modals/AddContributorModal";

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
    }
  }
}
</script>

<style>

</style>