<template>
  <ion-item @change="itemTextChanged($event)">
    <div class="ion-padding-end">
      <ion-checkbox
          :disabled="item.id === null"
          @click="handleCheck()"
          v-model="isChecked"
      ></ion-checkbox>
    </div>
    <ion-input
        v-model="text"
        :style="item.text && item.isCompleted ? 'text-decoration: line-through;':'' "
        placeholder="Add item"
        clear-on-edit
    ></ion-input>
    <ion-icon :icon="trashBinSharp"></ion-icon>
  </ion-item>
</template>

<script>
import {IonItem, IonInput, IonCheckbox, IonIcon} from '@ionic/vue'
import {trashBinSharp} from 'ionicons/icons';
import {mapActions, mapMutations} from 'vuex'

export default {
  components: {IonItem, IonCheckbox, IonInput, IonIcon},
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
      isChecked: this.item.isCompleted,
      localItem: this.item
    }
  },
  setup() {
    return {
      trashBinSharp
    }
  },
  methods: {
    ...mapActions('lists', ['createOrUpdateListItem']),
    ...mapMutations('lists', ['handleItemCheck']),
    handleCheck() {
      this.handleItemCheck(this.item.id)
    },
    itemTextChanged(event) {
      let localItem = this.item;
      localItem.name = event.target.value;
      let payload = {index: this.index, item: localItem}
      this.createOrUpdateListItem(payload)
    }
  },
}
</script>

<style>
</style>