<template>
  <ion-page>
    <list-view-layout>
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-input class="list-title" placeholder="Title"></ion-input>
          </ion-item>
          <list-item v-for="(item,index) in listItems" :key="item.id" :item="item" :index="index"/>
        </ion-list>
        <ion-list>
        </ion-list>
    </ion-content>
    </list-view-layout>
  </ion-page>
</template>

<script>
import ListViewLayout from '../components/layout/ListViewLayout.vue'
import ListItem from '../components/ListItem.vue'
import { IonItem, IonInput,IonPage, IonList, IonContent } from '@ionic/vue'
import { trashBinSharp } from 'ionicons/icons';
import {mapGetters} from 'vuex'
export default {
  name: 'ListView',
  components:{
    ListViewLayout, IonPage, IonList, IonContent, ListItem,IonItem, IonInput
  },
  setup() {
    return {
      trashBinSharp
    }
  },
  computed: {
    ...mapGetters({ listItems:'getShoppingItems'})
  }
}
</script>

<style>
.list-title{
  font-weight: bold;
  --placeholder-font-weight: bold;
}
</style>