<template>
  <ion-item lines="inset">
    <ion-icon :icon="locationOutline" class="ion-padding-end" color="primary">
    </ion-icon>
    <ion-input
        :disabled="isDisabled()"
        ref="input"
        placeholder="Add location"
        type="text"></ion-input>
    <ion-button
        :disabled="isDisabled()"
        @click="addLocation()"
        fill="clear">
      <ion-icon
          slot="icon-only"
          :icon="checkmarkOutline">
      </ion-icon>
    </ion-button>
  </ion-item>
</template>

<script>
import {checkmarkOutline, locationOutline} from 'ionicons/icons'
import {IonButton, IonIcon, IonInput, IonItem, toastController} from "@ionic/vue";
import {MAPS_API_KEY} from "@/config";
import {Loader} from '@googlemaps/js-api-loader'
import {capitalizeFirstLetters} from '@/utils'
import Location from '@/model/location'
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "AddLocationInput",
  components: {IonItem, IonIcon, IonInput, IonButton},
  setup() {
    return {
      checkmarkOutline, locationOutline
    }
  },
  data() {
    return {
      location: {},
      loader: new Loader({
        apiKey: MAPS_API_KEY,
        libraries: ["places"]
      })
    }
  },
  methods: {
    ...mapActions('lists', ['updateListSimpleAction']),
    ...mapMutations('lists', ['updateListMutation']),
    isDisabled(){
      return this.currentList.location !== null
    },
    addLocation() {
      let localCurrentList = this.currentList;
      localCurrentList.location = this.location;
      this.updateListSimpleAction(localCurrentList)
          .then(response => {
            this.updateListMutation(response.data)
            toastController.create({
              message: 'Successfully added location for list',
              duration: 1000,
            }).then(toast => toast.present())
          })
    }
  },
  computed: {
    ...mapState('lists', ['currentList'])
  },
  mounted() {
    this.loader.load()
        .then((google) => {
          this.$refs.input.$el.getInputElement().then(input => {
            let autocomplete = new google.maps.places.Autocomplete(input, {
              types: ['establishment'],
              componentRestrictions: {'country': ['RO']},
              fields: ['place_id', 'geometry', 'name']
            })
            autocomplete.addListener("place_changed", () => {
              const place = autocomplete.getPlace()
              const placeName = place.name
              const formattedPlaceName = capitalizeFirstLetters(placeName.split(" "))
              const geocoder = new google.maps.Geocoder();
              geocoder
                  .geocode({placeId: place.place_id})
                  .then(({results}) => {
                    const geocoderLocation = results[0].geometry.location
                    this.location = new Location(geocoderLocation.lat(), geocoderLocation.lng(), formattedPlaceName)
                  });
            })
          })
        })
  }
}
</script>

<style scoped>

</style>