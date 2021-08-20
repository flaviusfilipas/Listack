<template>
  <ion-header translucent>
    <ion-toolbar>
      <ion-title>Add contributor</ion-title>
      <ion-buttons slot="start">
        <ion-button @click="dismiss">
          <ion-icon :icon="closeOutline" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content fullscreen>
      <add-contributor/>
    <ion-list>
      <ion-list-header>Contributors</ion-list-header>
      <contributor-item v-for="contributor in contributors"
                        :key="contributor.id"
                        :currentContributor="contributor">
      </contributor-item>
    </ion-list>
    <ion-list>
      <ion-list-header>Pending</ion-list-header>
      <contributor-item v-for="contributor in pendingContributors"
                        :key="contributor.id"
                        :currentContributor="contributor">
      </contributor-item>
    </ion-list>
  </ion-content>
</template>

<script>
import {
  IonHeader,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonButton,
  IonButtons,
  IonContent,
  IonList, modalController
} from '@ionic/vue'
import ContributorItem from "@/components/ContributorItem";
import {closeOutline, personAddOutline} from 'ionicons/icons'
import {mapMutations, mapState} from "vuex";
import Contributor from "@/model/contributor";
import AddContributor from "@/components/AddContributor";

export default {
  name: "AddContributorModal",
  components: {
    AddContributor,
    ContributorItem,
    IonHeader, IonToolbar, IonIcon, IonTitle, IonButton, IonButtons, IonContent, IonList
  },
  setup() {
    return {closeOutline, personAddOutline}
  },
  methods: {
    ...mapMutations('lists', ['addContributor']),
    add() {
      let newContributor = new Contributor(this.currentList.id, this.currentUser.name, '')
      this.addContributor(newContributor)
    },
    dismiss() {
      modalController.dismiss();
    }
  },
  computed: {
    ...mapState('lists', ['currentList', 'pendingContributors','contributors']),
    ...mapState('auth', ['currentUser'])
  }
}
</script>

<style scoped>

</style>