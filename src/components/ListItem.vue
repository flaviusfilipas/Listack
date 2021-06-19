<template>
  <ion-item>
    <div class="ion-padding-end">
      <ion-checkbox
        @click="handleCheck()"
        v-model="isChecked"
      ></ion-checkbox>
    </div>
    <ion-input
      @change="itemTextChanged($event)"
      v-model="text"
      :style="item.text && item.isCompleted ? 'text-decoration: line-through;':'' "
      placeholder="Add item"
      clear-on-edit
    ></ion-input>
    <ion-icon :icon="trashBinSharp"></ion-icon>
  </ion-item>
</template>

<script>
import { IonItem, IonInput, IonCheckbox, IonIcon } from '@ionic/vue'
import { trashBinSharp } from 'ionicons/icons';
import { mapActions } from 'vuex'
export default {
  components: { IonItem, IonCheckbox, IonInput, IonIcon },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    }
  },
  data () {
    return {
      text: this.item.text,
      isChecked: this.item.isCompleted,
      localItem: this.item
    }
  },
  setup () {
    return {
      trashBinSharp
    }
  },
  methods: {
    ...mapActions(['updateListItem']),
    handleCheck () {
      if (!this.item.isCompleted) {
        this.$store.commit('checkItem', this.item.id)
      } else {
        this.$store.commit('unCheckItem', this.item.id)
      }

    },
    itemTextChanged (event) {
      this.updateListItem({ index: this.index, updates: { text: event.target.value } })
    }
  },
}
</script>

<style>
</style>