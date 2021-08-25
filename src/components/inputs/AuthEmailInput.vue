<template>
  <ion-item class="with-margins" lines="full">
    <ion-label position="floating">Email</ion-label>
    <ion-icon slot="end" :icon="mailOutline" class="pointer-cursor ion-margin-top" color="primary"></ion-icon>
    <v-field v-slot={field} v-model="inputEmail" :rules="'required|email'" name="Email">
      <ion-input v-bind="field" name="Email" required></ion-input>
    </v-field>
  </ion-item>
  <v-error-message class="ion-padding-start" name="Email" style="color:var(--ion-color-danger)"/>
</template>

<script>
import {defineRule, ErrorMessage, Field} from 'vee-validate'
import {mailOutline} from "ionicons/icons";
import {email, required} from '@vee-validate/rules'
import {IonIcon, IonInput, IonItem, IonLabel} from "@ionic/vue";

export default {
  name: "AuthEmailInput",
  components:{
    IonItem,IonInput,IonLabel,IonIcon,
    VField: Field, VErrorMessage: ErrorMessage
  },
  emits:['emitEmailValue'],
  props:{
    defaultEmailValue:{
      type:String,
      required:false,
    }
  },
  data(){
    return {
      inputEmail: this.$route.query.recipientEmail ? this.$route.query.recipientEmail : ''
    }
  },
  setup() {
    defineRule("email", email)
    defineRule("required", required)
    return {
       mailOutline, email
    }
  },
  watch:{
    inputEmail: function(newValue) {
      this.$emit('emitEmailValue',newValue)
    }
  }
}
</script>

<style scoped>
.with-margins {
  margin: 16px 16px 16px 16px;
}
</style>