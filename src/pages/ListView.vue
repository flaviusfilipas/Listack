<template>
  <ion-page>
    <list-view-layout>
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-input class="list-title" placeholder="Title"></ion-input>
          </ion-item>
          <ion-item>
            <div class="ion-padding-end">
              <ion-checkbox></ion-checkbox>
            </div>
            <ion-input placeholder="Add item"></ion-input>
            <ion-icon :icon="trashBinSharp"></ion-icon>
          </ion-item>
        </ion-list>
        <ion-list>
        </ion-list>
    </ion-content>
    </list-view-layout>
  </ion-page>
</template>

<script>
import ListViewLayout from '../components/layout/ListViewLayout.vue'
import { IonPage, IonList, IonItem, IonCheckbox, IonInput, IonIcon, IonContent } from '@ionic/vue'
import { trashBinSharp } from 'ionicons/icons';
export default {
  name: 'ListView',
  components:{
    ListViewLayout, IonPage, IonList, IonItem, IonCheckbox, IonInput, IonIcon, IonContent
  },
  setup() {
    return {
      trashBinSharp
    }
  }
}
</script>

<style>
.list-title{
  font-weight: bold;
  --placeholder-font-weight: bold;
}
</style>