<template>
  <ion-item >
    <ion-icon color="primary" class="ion-padding-end" :icon="personCircleOutline">
    </ion-icon>
    <ion-input @keyup.enter="sendInvite" v-model="email" type="email" inputmode="email" pattern="email"
               placeholder="Enter email"></ion-input>
    <ion-button
        @click="sendInvite"
        fill="clear">
      <ion-icon
          slot="icon-only"
          :icon="checkmarkOutline">
      </ion-icon>
    </ion-button>
  </ion-item>
</template>

<script>
import {
  IonButton,
  IonIcon, IonInput,
  IonItem,
} from "@ionic/vue";
import {personCircleOutline, checkmarkOutline} from 'ionicons/icons'
import {mapMutations, mapState} from "vuex";
import ContributorInvitation from "@/model/contributorInvitation";

export default {
  name: "AddContributor",
  components: {IonItem, IonIcon, IonInput, IonButton},
  data() {
    return {
      email: ''
    }
  },
  methods: {
    ...mapMutations('lists',['addPendingContributorInvite']),
    sendInvite(){
      const invitationPayload = new ContributorInvitation(this.email, this.currentList.id)
      this.addPendingContributorInvite(invitationPayload)
      this.email=''
    }
  },
  computed:{
    ...mapState('lists',['currentList'])
  },
  setup() {
    return {checkmarkOutline, personCircleOutline}
  },
}
</script>

<style scoped>

</style>