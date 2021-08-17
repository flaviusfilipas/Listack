<template>
  <ion-page>
    <list-view-layout>
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-input
                class="list-title"
                placeholder="Title"
                @change="updateListTitle($event)"
                v-model="currentListTitle">
            </ion-input>
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
                :icon="addCircleOutline">
            </ion-icon>
          </ion-button>
        </div>
        <hr v-if="completedItems.length > 0">
        <ion-list
            ref="list"
            v-show="completedItems.length >0">
          <ion-item lines="none">
            <ion-label>Completed items</ion-label>
            <ion-button @click="deleteCompletedItems" color="danger" fill="clear">
              <ion-icon
                  slot="icon-only"
                  :icon="trashOutline">
              </ion-icon>
            </ion-button>
          </ion-item>
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
import {
  IonItem,
  IonInput,
  IonPage,
  IonList,
  IonContent,
  IonLabel,
  IonIcon,
  IonButton,
  toastController
} from '@ionic/vue'
import {addCircleOutline, trashOutline} from 'ionicons/icons';
import {mapState, mapMutations, mapActions} from 'vuex'
import Task from '../model/task'

export default {
  name: 'ListView',
  components: {
    ListViewLayout, IonPage, IonList, IonContent, ListItem, IonItem, IonInput, IonLabel, IonIcon, IonButton
  },
  data() {
    return {
      listId: Number(this.$route.params.id)
    }
  },
  setup() {
    return {
      addCircleOutline, trashOutline
    }
  },
  methods: {
    ...mapMutations('lists', {addItem: 'addItem', deleteCompletedItemsMutation: 'deleteCompletedItems'}),
    ...mapActions('lists', {
      getItemsByListId: 'getItemsByListId', updateList: 'updateList',
      deleteCompletedItemsAction: 'deleteCompletedItems'
    }),
    add() {
      const item = new Task('', false, this.listId);
      this.addItem(item)
      setTimeout(() => {
        this.$nextTick(() => this.$refs.listItem.$el.children[1].setFocus());
      }, 50);
    },
    updateListTitle(event) {
      let item = this.userLists.find(list => list.id === this.listId);
      const index = this.userLists.indexOf(item)
      item.title = event.target.value;
      this.updateList({index: index, item: item})
    },
    deleteCompletedItems() {
      this.deleteCompletedItemsAction(this.listId)
          .then(() => {
            this.deleteCompletedItemsMutation(this.listId)
            toastController.create({
              message: 'Successfully deleted checked items',
              duration: 1000,
            }).then(toast => toast.present())
          })
    }
  },
  computed: {
    ...mapState('lists', ['shoppingItems', 'userLists']),
    listItems() {
      return this.shoppingItems.filter(function (item) {
        return (item.listId === this.listId) && !item.completed
      }, this)
    },
    completedItems() {
      return this.shoppingItems.filter(function (item) {
        return (item.listId === this.listId) && item.completed
      }, this)
    },
    currentListTitle() {
      const title = this.userLists.find(list => list.id === this.listId).title;
      return title === 'Unnamed list' ? '' : title;
    }
  },
  mounted() {
    this.getItemsByListId(Number(this.$route.params.id));
  }
}
</script>

<style scoped>
.list-title {
  font-weight: bold;
  --placeholder-font-weight: bold;
}

.completed-section {
  display: flex;
  justify-content: space-between;
}

.add-item {
  display: grid;
  grid-template-columns: auto;
  justify-items: center;
}
</style>