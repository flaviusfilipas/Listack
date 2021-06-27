<template>
  <ion-page>
    <basic-layout>
      <ion-content>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button router-link='/shopping-list'>
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      <ion-list inset>
        <list-card v-for="item in userLists" :list="item" :key="item.id"></list-card>
      </ion-list>
      </ion-content>
    </basic-layout>
  </ion-page>
</template>

<script>
import {IonPage, IonContent, IonIcon, IonFab, IonFabButton, IonList} from '@ionic/vue'
import BasicLayout from '../components/layout/BasicLayout.vue'
import { add } from 'ionicons/icons';
import ListCard from '../components/ListCard.vue'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  components: {
    IonPage,
    BasicLayout,
    IonIcon,
    IonFab,
    IonFabButton,
    IonContent,
    ListCard,
    IonList
  },
  setup(){
    return {add};
  },
  computed:{
    ...mapState(['userLists'])
  }
}
</script>

<style>

</style>