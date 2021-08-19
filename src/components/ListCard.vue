<template>
  <ion-item
      button
      @click="() => this.$router.push(`/list/${list.id}`)">
    <ion-label>{{ list.title }}</ion-label>
    <ion-button
        fill="clear"
        color="danger"
        @click.stop="deleteList">
      <ion-icon
          slot="icon-only"
          :icon="trashOutline"/>
    </ion-button>
  </ion-item>
</template>

<script>
import {IonLabel, IonItem, alertController, toastController, IonIcon} from '@ionic/vue'
import {mapActions, mapMutations} from "vuex";
import { trashOutline } from 'ionicons/icons';

export default {
  name: 'ListCard',
  components: {IonLabel, IonItem,IonIcon},
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions('lists', {deleteListAction: 'deleteList'}),
    ...mapMutations('lists', {deleteListMutation: 'deleteList'}),
    deleteList() {
      alertController.create({
        header: 'Confirm',
        message: 'Are you sure you want to delete this list?',
        buttons: [
          {
            text: 'Confirm',
            handler: () => {
              this.deleteListAction(this.list.id)
                  .then(() => {
                    this.deleteListMutation(this.list.id)
                    toastController.create({
                      message: 'List has been deleted',
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
      trashOutline
    }
  },
}
</script>

<style>
</style>