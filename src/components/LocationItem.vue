<template>
  <ion-item>
    <ion-icon :icon="locationOutline" class="ion-padding-end" color="primary">
    </ion-icon>
    <ion-label style="font-weight: bold">{{ name }}
    </ion-label>
    <ion-button
        color="danger"
        fill="clear"
        @click="deleteLocation()">
      <ion-icon
          slot="icon-only"
          :icon="trashOutline">
      </ion-icon>
    </ion-button>
  </ion-item>
</template>

<script>
import {locationOutline, trashOutline} from 'ionicons/icons'
import {alertController, IonButton, IonIcon, IonItem, IonLabel, toastController} from "@ionic/vue";
import {mapActions, mapMutations} from "vuex";

export default {
  name: "LocationItem",
  components: {IonItem, IonIcon, IonButton, IonLabel},
  props: {
    currentList: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      name: this.currentList.location.locationName
    }
  },
  methods: {
    ...mapActions('lists',['updateListSimpleAction']),
    ...mapMutations('lists',['updateListMutation']),
    deleteLocation() {
      alertController.create({
        header: 'Confirm',
        message: `Are you sure you want to delete location for list ${this.currentList.title} ?`,
        buttons: [
          {
            text: 'Confirm',
            handler: () => {
              const localList = this.currentList;
              localList.location = null;
              this.updateListSimpleAction(localList)
                  .then(response => {
                    this.updateListMutation(response.data)
                    toastController.create({
                      message: 'Location has been deleted',
                      duration: 1000,
                    }).then(toast => toast.present())
                  })
            },
          },
          {
            text: 'Cancel'
          },
        ],
      }).then(alert => alert.present());
    }
  },
  setup() {
    return {
      locationOutline, trashOutline
    }
  }
}
</script>

<style scoped>

</style>