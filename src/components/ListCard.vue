<template>
  <ion-item href="/shopping-list">
      <ion-label>{{list.name !== null ? list.name : 'Unamed list'}}</ion-label>
       <ion-button
            fill="clear">
            <ion-icon
              slot="icon-only"
              :icon="ellipsisVerticalOutline"></ion-icon>
        </ion-button>
  </ion-item>
</template>

<script>
import {IonLabel, IonIcon, IonItem, IonButton} from '@ionic/vue'
import {ellipsisVerticalOutline} from 'ionicons/icons'
export default {
  name:'ListCard',
  components:{IonLabel, IonIcon, IonItem, IonButton},
  props:{
    list:{
      type: Object,
      required: true
    }
  },
  setup(){
    return {ellipsisVerticalOutline}
  }
}
</script>

<style>

</style>