<template>
  <ion-item>
    <ion-icon color="primary" class="ion-padding-end" :icon="personCircleOutline">
    </ion-icon>
    <ion-input @change="update" v-model="email" type="email" inputmode="email" pattern="email"
               placeholder="Enter email"></ion-input>
    <ion-button
        color="danger"
        fill="clear">
      <ion-icon
          slot="icon-only"
          :icon="trashBinSharp">
      </ion-icon>
    </ion-button>
  </ion-item>
</template>

<script>
import {IonItem, IonIcon, IonInput, IonButton} from '@ionic/vue'
import {trashBinSharp, personCircleOutline} from 'ionicons/icons'
import { mapMutations} from "vuex";

export default {
  components: {IonItem, IonIcon, IonInput, IonButton},
  name: "ContributorItem",
  props: {
    currentContributor: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup() {
    return {trashBinSharp, personCircleOutline}
  },
  data() {
    return {
      email: this.currentContributor.contributorEmail
    }
  },
  methods: {
    ...mapMutations("lists",['updateContributor']),
    update() {
      let localContributor = this.currentContributor;
      localContributor.contributorEmail = this.email;
      const payload = {index:this.index, contributor: localContributor}
      this.updateContributor(payload)
    }
  }
}
</script>

<style scoped>

</style>