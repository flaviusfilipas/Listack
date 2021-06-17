<template>
  <ion-page>
    <basic-layout>
      <ion-content>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button>
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </ion-content>
    </basic-layout>
  </ion-page>
</template>

<script>
import {IonPage, IonContent, IonIcon, IonFab, IonFabButton} from '@ionic/vue'
import BasicLayout from '../components/layout/BasicLayout.vue'
import { add } from 'ionicons/icons';
export default {
  name: 'Home',
  components: {
    IonPage,
    BasicLayout,
    IonIcon,
    IonFab,
    IonFabButton,
    IonContent
  },
  setup(){
    return {add};
  }
}
</script>

<style>

</style>