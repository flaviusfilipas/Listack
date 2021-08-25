<template>
  <v-form @submit="sendInvite()">
    <ion-item>
      <ion-icon :icon="personAddOutline" class="ion-padding-end" color="primary">
      </ion-icon>
      <v-field
              v-slot="{field}" v-model="inputEmail" :rules="email" name="Email">
        <ion-input
            v-bind="field"
            name="Email"
            placeholder="Enter email"
            type="email"></ion-input>
      </v-field>
      <ion-button
          fill="clear"
          type="submit">
        <ion-icon
            slot="icon-only"
            :icon="checkmarkOutline">
        </ion-icon>
      </ion-button>
    </ion-item>
    <v-error-message class="ion-padding-start" name="Email" style="color:var(--ion-color-danger)"/>
    <pre>{{inputEmail}}</pre>
  </v-form>

</template>

<script>
import {IonButton, IonIcon, IonInput, IonItem,} from "@ionic/vue";
import {checkmarkOutline, personAddOutline} from 'ionicons/icons'
import {mapActions, mapMutations, mapState} from "vuex";
import ContributorInvitation from "@/model/contributorInvitation";
import {defineRule, ErrorMessage, Field, Form} from 'vee-validate'
import {email} from '@vee-validate/rules'

export default {
  name: "AddContributor",
  components: {
    IonItem, IonIcon, IonInput, IonButton,
    VForm: Form, VField: Field, VErrorMessage: ErrorMessage
  },
  data() {
    return {
      inputEmail: ''
    }
  },
  methods: {
    ...mapActions('lists', ['createContributorPendingInvite']),
    ...mapMutations('lists', ['addPendingContributorInvite']),
    sendInvite() {
      const invitationPayload = new ContributorInvitation(this.inputEmail, this.currentList.id)
      this.addPendingContributorInvite(invitationPayload)
      this.inputEmail = ''
    }
  },
  computed: {
    ...mapState('lists', ['currentList'])
  },
  setup() {
    defineRule("Email", email)
    return {checkmarkOutline, personAddOutline, email}
  },
}
</script>

<style scoped>

</style>