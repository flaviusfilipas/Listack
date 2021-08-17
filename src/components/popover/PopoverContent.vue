<template>
  <ion-list>
    <ion-item lines="none" button @click="deleteList">Delete list</ion-item>
  </ion-list>
</template>

<script>
import {IonList, IonItem, alertController, toastController} from '@ionic/vue'
import {mapActions, mapMutations} from 'vuex'

export default {
  name: 'PopoverContent',
  components: {IonList, IonItem},
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
      this.$emit('confirm-modal')
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
    },
  }
}
</script>

<style>

</style>