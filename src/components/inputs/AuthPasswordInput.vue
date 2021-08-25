<template>
  <ion-item class="with-margins" lines="full">
    <ion-label position="floating">Password</ion-label>
    <ion-icon slot="end" :icon="isPwd ? eyeOffOutline: eyeOutline" class="pointer-cursor ion-margin-top"
              color="primary"
              @click="isPwd = !isPwd"></ion-icon>
    <v-field v-slot={field} v-model="password" :rules="'required|min:6'" name="Password">
      <ion-input v-bind="field" :type="isPwd? 'password' : 'text'"  name="Password" required>
      </ion-input>
    </v-field>
  </ion-item>
  <v-error-message class="ion-padding-start" name="Password" style="color:var(--ion-color-danger)"/>
</template>

<script>
import {IonIcon, IonInput, IonItem, IonLabel} from "@ionic/vue";
import {defineRule, ErrorMessage, Field} from "vee-validate";
import {min, required} from '@vee-validate/rules'
import {eyeOffOutline, eyeOutline} from "ionicons/icons";

export default {
  name: "AuthPasswordInput",
  components:{
    IonItem,IonInput,IonLabel,IonIcon,
    VField: Field, VErrorMessage: ErrorMessage
  },
  emits:['emitPasswordValue'],
  data(){
    return {
      password: '',
      isPwd:true
    }
  },
  setup() {
    defineRule("required", required)
    defineRule("min", min)
    return {
      eyeOffOutline, eyeOutline,required,min
    }
  },
  watch:{
    password: function(newValue){
      this.$emit('emitPasswordValue',newValue)
    }
  }
}
</script>

<style scoped>
.with-margins {
  margin: 16px 16px 16px 16px;
}
</style>