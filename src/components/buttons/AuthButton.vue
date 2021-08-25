<template>
  <ion-row class="with-margins">
    <ion-col>
      <ion-button color="primary" expand="block" shape="round" type="submit">{{ buttonTitle }}</ion-button>
    </ion-col>
  </ion-row>
</template>
<script>
import {IonButton, IonCol, IonRow} from "@ionic/vue";

export default {
  name: "AuthButton",
  components:{IonRow, IonCol, IonButton},
  props:{
    buttonTitle:{
      type:String,
      required:true
    }
  }
}
</script>

<style scoped>

</style>