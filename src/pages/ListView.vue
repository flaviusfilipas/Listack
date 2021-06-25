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
            ref="listItem"
            :key="item.id"
            :item="item"
            :index="index"
          />
        </ion-list>
        <div class="add-item">
          <ion-button
            @click="add()"
            fill="clear"
            size="large">
            <ion-icon
              slot="icon-only"
              :icon="addCircleOutline"
            ></ion-icon>
          </ion-button>
        </div>
        <hr v-if="completedItems.length > 0">
        <ion-list
          ref="list"
          v-show="completedItems.length >0"
        >
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
import { IonItem, IonInput, IonPage, IonList, IonContent, IonLabel, IonIcon, IonButton } from '@ionic/vue'
import { addCircleOutline } from 'ionicons/icons';
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'ListView',
  components: {
    ListViewLayout, IonPage, IonList, IonContent, ListItem, IonItem, IonInput, IonLabel, IonIcon, IonButton
  },
  setup () {
    return {
      addCircleOutline
    }
  },
  methods: {
    ...mapMutations(['addItem']),
    add () {
      const item = {
        "id": 16,
        "text": '',
        "isCompleted": false,
        "listId": 1
      }
      this.addItem(item)
      setTimeout(() => {
        this.$nextTick(() => this.$refs.listItem.$el.children[1].setFocus());
      }, 10);
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
.add-item {
  display: grid;
  grid-template-columns: auto;
  justify-items: center;
}
</style>