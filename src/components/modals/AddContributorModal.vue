<template>
  <ion-header translucent>
    <ion-toolbar>
      <ion-title>Add contributor</ion-title>
      <ion-buttons slot="start">
        <ion-button @click="dismiss()">
          <ion-icon :icon="closeOutline" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button :disabled="handleDisabled()"
                    @click="sendConfirmationEmail">Save
        </ion-button>
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
      <contributor-item v-for="(contributor,index) in pendingContributors"
                        :key="contributor.id"
                        :index="index"
                        :currentContributor="contributor"
                        :withDeleteButton="!contributor.sentEmail">
      </contributor-item>
    </ion-list>
  </ion-content>
</template>

<script>
import {
  alertController,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonListHeader,
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
    IonHeader, IonToolbar, IonIcon, IonTitle, IonButton, IonButtons, IonContent, IonList,
    IonListHeader
  },
  data() {
    return {
      pendingContributorInvitationsSize: 0
    }
  },
  setup() {
    return {closeOutline, personAddOutline}
  },
  methods: {
    handleDisabled(){
      return this.pendingContributors.length <= this.pendingContributorInvitationsSize
    },
    ...mapMutations('lists', ['populatePendingContributorInvitations']),
    ...mapActions('lists', {
      getPendingContributorInvitationsByListId: 'getPendingContributorInvitationsByListId',
      sendConfirmationEmailAction: 'sendConfirmationEmails'
    }),
    dismiss() {
      if (this.pendingContributors.length > this.pendingContributorInvitationsSize) {
        alertController.create({
          header: 'Discard changes',
          message: 'Are you sure you want to discard your changes?',
          buttons: [
            {
              text: 'Discard',
              handler: () => {
                modalController.dismiss()
              },
            },
            {
              text: 'Cancel'
            },
          ],
        }).then(alert => alert.present());
      }else{
        modalController.dismiss()
      }
    },
    sendConfirmationEmail() {
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
        .then(response => {
          this.populatePendingContributorInvitations(response.data)
          this.pendingContributorInvitationsSize = this.pendingContributors.length
        });


  }
}
</script>

<style scoped>

</style>