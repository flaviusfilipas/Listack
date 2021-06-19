<template>
  <ion-page>
    <list-view-layout>
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-input
              class="list-title"
              placeholder="Title"
            ></ion-input>
          </ion-item>
          <list-item
            v-for="(item,index) in listItems"
            :key="item.id"
            :item="item"
            :index="index"
          />
        </ion-list>
        <hr v-if="completedItems.length > 0">
          <ion-list v-show="completedItems.length >0">
            <div class="ion-padding-start">
              <ion-label>Completed items</ion-label>
            </div>
            <list-item
              v-for="(item,index) in completedItems"
              :key="item.id"
              :item="item"
              :index="index"
            />
          </ion-list>
      </ion-content>
    </list-view-layout>
  </ion-page>
</template>

<script>
import ListViewLayout from '../components/layout/ListViewLayout.vue'
import ListItem from '../components/ListItem.vue'
import { IonItem, IonInput, IonPage, IonList, IonContent,IonLabel } from '@ionic/vue'
import { trashBinSharp } from 'ionicons/icons';
import { mapState } from 'vuex'
export default {
  name: 'ListView',
  components: {
    ListViewLayout, IonPage, IonList, IonContent, ListItem, IonItem, IonInput,IonLabel
  },
  setup () {
    return {
      trashBinSharp
    }
  },
  computed: {
    ...mapState(['shoppingItems']),
    listItems () {
      return this.shoppingItems.filter(item => !item.isCompleted)
    },
    completedItems () {
      return this.shoppingItems.filter(item => item.isCompleted)
    }
  }
}
</script>

<style>
.list-title {
  font-weight: bold;
  --placeholder-font-weight: bold;
}
</style>