<template>
  <ion-item>
    <ion-icon color="primary" class="ion-padding-end" :icon="personCircleOutline">
    </ion-icon>
    <ion-label style="font-weight: bold">{{ email }}
    </ion-label>
    <ion-button
        v-if="withDeleteButton"
        @click="deletePendingInvite(index)"
        color="danger"
        fill="clear">
      <ion-icon
          slot="icon-only"
          :icon="trashOutline">
      </ion-icon>
    </ion-button>
  </ion-item>
</template>

<script>
import {IonButton, IonIcon, IonItem, IonLabel} from '@ionic/vue'
import {personCircleOutline, trashOutline} from 'ionicons/icons'
import {mapMutations} from "vuex";

export default {
  components: {IonItem, IonIcon, IonButton, IonLabel},
  name: "ContributorItem",
  props: {
    currentContributor: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    },
    withDeleteButton: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {trashOutline, personCircleOutline}
  },
  data() {
    return {
      email: this.currentContributor.email
    }
  },
  methods: {
    ...mapMutations("lists", ['deletePendingInvite'])

  }
}
</script>

<style scoped>

</style>