<template>
  <ion-list>
    <ion-item lines="none" button>Delete list</ion-item>
    <ion-item lines="none" button>Delete checked items</ion-item>
  </ion-list>
</template>

<script>
import {IonList, IonItem} from '@ionic/vue'
export default {
  name: 'PopoverContent',
  components:{IonList, IonItem}
}
</script>

<style>

</style>