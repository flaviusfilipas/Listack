<template>
  <ion-header translucent>
    <ion-toolbar>
      <ion-title>Add contributor</ion-title>
      <ion-buttons slot="start">
        <ion-button @click="dismiss">
          <ion-icon :icon="closeOutline" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button @click="sendConfirmationEmail">Save</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content fullscreen>
    <add-contributor/>
    <ion-list v-if="contributors.length > 0">
      <ion-list-header>Contributors</ion-list-header>
      <contributor-item v-for="contributor in contributors"
                        :key="contributor.id"
                        :currentContributor="contributor">
      </contributor-item>
    </ion-list>
    <ion-list v-if="pendingContributors.length > 0">
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
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonTitle,
  IonToolbar,
  modalController,
  toastController
} from '@ionic/vue'
import ContributorItem from "@/components/ContributorItem";
import {closeOutline, personAddOutline} from 'ionicons/icons'
import {mapActions, mapMutations, mapState} from "vuex";
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
    ...mapActions('lists', {
      getPendingContributorInvitationsByListId: 'getPendingContributorInvitationsByListId',
      sendConfirmationEmailAction: 'sendConfirmationEmails'
    }),
    dismiss() {
      modalController.dismiss();
    },
    sendConfirmationEmail(){
      this.sendConfirmationEmailAction(this.currentUser.name)
      .then(() => {
        toastController.create({
          message: 'Invitations have been sent',
          duration: 1000,
        }).then(toast => toast.present())
      })
    }
  },
  computed: {
    ...mapState('lists', ['currentList', 'pendingContributors', 'contributors']),
    ...mapState('auth', ['currentUser'])
  },
  mounted() {
    this.getPendingContributorInvitationsByListId(this.currentList.id)
  }
}
</script>

<style scoped>

</style>