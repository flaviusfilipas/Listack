<template>
  <ion-item>
    <ion-icon :icon="pinOutline" class="ion-padding-end" color="primary">
    </ion-icon>
    <ion-input
        ref="input"
        placeholder="Add location"
        type="text"></ion-input>
    <ion-button
        fill="clear">
      <ion-icon
          slot="icon-only"
          :icon="checkmarkOutline">
      </ion-icon>
    </ion-button>
  </ion-item>
</template>

<script>
/* eslint-disable */
import {checkmarkOutline, pinOutline} from 'ionicons/icons'
import {IonButton, IonIcon, IonInput, IonItem} from "@ionic/vue";
import {MAPS_API_KEY} from "@/config";
import {Loader} from '@googlemaps/js-api-loader'

export default {
  name: "AddLocationInput",
  components: {IonItem, IonIcon, IonInput, IonButton},
  methods: {
    data() {
      return {
        loader: new Loader({
          apiKey: MAPS_API_KEY,
          libraries: ["places"]
        })
      }
    },
    mounted() {
      this.loader.load()
          .then((google) => {
            const nativeInput = this.$refs.input.$el.getInputElement().then(input => {
              new google.maps.places.Autocomplete(input, {
                types: ['establishment'],
                componentRestrictions: {'country': ['RO']},
                fields: ['geometry', 'name']
              })
            })

          })
    },
    setup() {
      return {
        checkmarkOutline, pinOutline
      }
    }
  }
}
</script>

<style scoped>

</style>