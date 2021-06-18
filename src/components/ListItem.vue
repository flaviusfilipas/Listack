<template>
  <ion-item>
    <div class="ion-padding-end">
      <ion-checkbox @click="updateListItem({index: index, updates:{ isCompleted: !item.isCompleted}})" v-model="isChecked"></ion-checkbox>
    </div>
    <ion-input @change="itemTextChanged($event)" v-model="text" :style="item.text && item.isCompleted ? 'text-decoration: line-through;':'' " placeholder="Add item" clear-on-edit></ion-input>
    <ion-icon :icon="trashBinSharp"></ion-icon>
  </ion-item>
</template>

<script>
import {IonItem, IonCheckbox, IonInput, IonIcon} from '@ionic/vue'
import { trashBinSharp } from 'ionicons/icons';
import {mapActions} from 'vuex'
export default {
  components:{IonItem, IonCheckbox, IonInput, IonIcon},
  props: {
    item: {
      type: Object,
      required: true
    },
    index:{
      type: Number
    }
  },
  data () {
    return{
      text: this.item.text,
      isChecked: this.item.isCompleted,
    }
  },
  setup() {
    return {
      trashBinSharp
    }
  },
  methods:{
    ...mapActions(['updateListItem']),
    itemTextChanged(event){
      this.updateListItem({index: this.index, updates:{ text: event.target.value}})
    }
  },
}
</script>

<style>

</style>