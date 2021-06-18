<template>
  <ion-page>
     <basic-layout></basic-layout>
  </ion-page>
</template>

<script>
import {IonPage} from '@ionic/vue'
import BasicLayout from '../components/layout/BasicLayout.vue'
export default {
name: 'Login',
components:{
  IonPage,
  BasicLayout
  }

}
</script>

<style>

</style>