<template>
  <ion-item class="with-margins" lines="full">
    <ion-label position="floating">Name</ion-label>
    <ion-icon slot="end" :icon="personOutline" class="pointer-cursor ion-margin-top" color="primary"
              required></ion-icon>
    <v-field v-slot="{field}" v-model="name" :rules="required" name="Name">
      <ion-input v-bind="field" name="Name" type="text"></ion-input>
    </v-field>
  </ion-item>
  <v-error-message class="ion-padding-start" name="Name" style="color: var(--ion-color-danger)"/>
</template>
<script>
import {personOutline} from 'ionicons/icons'
import {IonIcon, IonInput, IonItem, IonLabel} from "@ionic/vue";
import {defineRule, ErrorMessage, Field} from "vee-validate";
import {required} from '@vee-validate/rules'

export default {
  name: 'AuthNameInput',
  components: {
    IonItem, IonInput, IonIcon,IonLabel,
    VField: Field, VErrorMessage: ErrorMessage
  },
  emits:['emitNameValue'],
  data() {
    return {
      name: ''
    }
  },
  setup() {
    defineRule("required", required)
    return {
      personOutline, required
    }
  },
  watch: {
    name: function (newValue) {
      this.$emit('emitNameValue', newValue)
    }
  }
}
</script>
<style scoped>
.with-margins {
  margin: 16px 16px 16px 16px;
}
</style>