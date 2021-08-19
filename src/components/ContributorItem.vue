<template>
  <ion-item>
    <ion-icon color="primary" class="ion-padding-end" :icon="personCircleOutline">
    </ion-icon>
    <ion-input type="email" inputmode="email" pattern="email" placeholder="Enter email"></ion-input>
    <ion-button
        color="danger"
        fill="clear">
      <ion-icon
          slot="icon-only"
          :icon="trashBinSharp">
      </ion-icon>
    </ion-button>
  </ion-item>
</template>

<script>
import {IonItem, IonIcon, IonInput, IonButton} from '@ionic/vue'
import {trashBinSharp,personCircleOutline} from 'ionicons/icons'

export default {
  components: {IonItem, IonIcon, IonInput, IonButton},
  name: "ContributorItem",
  setup() {
    return {trashBinSharp,personCircleOutline}
  }
}
</script>

<style scoped>

</style>