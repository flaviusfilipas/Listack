<template>
  <ion-header translucent>
    <ion-toolbar>
      <ion-title>Add contributor</ion-title>
      <ion-buttons slot="start">
        <ion-button @click="dismiss">
          <ion-icon :icon="closeOutline" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button>Save</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content fullscreen>
    <ion-list>
      <contributor-item v-for="(contributor,index) in contributors"
                        :key="contributor.id"
                        :currentContributor="contributor"
                        :index="index"
      ></contributor-item>
    </ion-list>
    <div class="add-item">
      <ion-button
          @click="add"
          fill="clear">
        <ion-icon
            slot="icon-only"
            :icon="personAddOutline">
        </ion-icon>
      </ion-button>
    </div>
  </ion-content>
</template>

<script>
import {
  IonHeader,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonButton,
  IonButtons,
  IonContent,
  IonList, modalController
} from '@ionic/vue'
import ContributorItem from "@/components/ContributorItem";
import {closeOutline, personAddOutline} from 'ionicons/icons'
import {mapMutations, mapState} from "vuex";
import Contributor from "@/model/contributor";

export default {
  name: "AddContributorModal",
  components: {
    ContributorItem,
    IonHeader, IonToolbar, IonIcon, IonTitle, IonButton, IonButtons, IonContent, IonList
  },
  setup() {
    return {closeOutline, personAddOutline}
  },
  methods: {
    ...mapMutations('lists', ['addContributor']),
    add() {
      let newContributor = new Contributor(this.currentList.id, this.currentUser.name, '')
      this.addContributor(newContributor)
    },
    dismiss() {
      modalController.dismiss();
    }
  },
  computed: {
    ...mapState('lists', ['currentList', 'contributors']),
    ...mapState('auth', ['currentUser'])
  }
}
</script>

<style scoped>
.add-item {
  display: grid;
  grid-template-columns: auto;
  justify-items: center;
}
</style>