<template>
  <ion-item>
    <ion-icon color="primary" class="ion-padding-end" :icon="personCircleOutline">
    </ion-icon>
    <ion-label>{{email}}</ion-label>
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
import {IonItem, IonIcon, IonButton, IonLabel} from '@ionic/vue'
import {trashBinSharp, personCircleOutline} from 'ionicons/icons'
import { mapMutations} from "vuex";

export default {
  components: {IonItem, IonIcon, IonButton,IonLabel},
  name: "ContributorItem",
  props: {
    currentContributor: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {trashBinSharp, personCircleOutline}
  },
  data() {
    return {
      email: this.currentContributor.email
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