<template>
  <ion-item
    button
    @click="() => this.$router.push(`/list/${list.id}`)"
  >
    <ion-label>{{list.name && list.name != '' ? list.name : 'Unamed list'}}</ion-label>
    <list-details-popover></list-details-popover>
  </ion-item>
</template>

<script>
import { IonLabel, IonItem } from '@ionic/vue'
import ListDetailsPopover from '../components/popover/ListDetailsPopover.vue'
export default {
  name: 'ListCard',
  components: { IonLabel, IonItem, ListDetailsPopover },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
}
</script>

<style>
</style>