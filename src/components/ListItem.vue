<template>
  <ion-item>
    <div class="ion-padding-end">
      <ion-checkbox
          :disabled="item.id === null"
          @click="updateItem($event)"
          v-model="completed"
      ></ion-checkbox>
    </div>
    <ion-input
        @change="updateItem($event)"
        v-model="text"
        :style="item.name && item.completed ? 'text-decoration: line-through;':'' "
        placeholder="Add item"
        clear-on-edit>
    </ion-input>

    <ion-button
        color="danger"
        fill="clear"
        @click="deleteTask(item.id)">
      <ion-icon
          slot="icon-only"
          :icon="trashBinSharp">
      </ion-icon>
    </ion-button>
  </ion-item>
</template>

<script>
import {IonItem, IonInput, IonCheckbox, IonIcon, IonButton} from '@ionic/vue'
import {trashBinSharp} from 'ionicons/icons';
import {mapActions} from 'vuex'

export default {
  components: {IonItem, IonCheckbox, IonInput, IonIcon, IonButton},
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      text: this.item.name,
      completed: this.item.completed,
      localItem: this.item
    }
  },
  setup() {
    return {
      trashBinSharp
    }
  },
  methods: {
    ...mapActions('lists', ['createOrUpdateListItem', 'deleteTask']),
    updateItem(event) {
      let localItem = this.item;
      switch (event.type) {
        case 'click':
          localItem.completed = !localItem.completed
          break;
        case 'change':
          localItem.name = event.target.value;
          break;
      }
      let payload = {index: this.index, item: localItem}
      this.createOrUpdateListItem(payload)
    }
  },
}
</script>

<style>
</style>