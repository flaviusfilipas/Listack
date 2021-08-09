<template>
  <ion-button v-if="!loggedIn" router-link='/login'>
    <div class="button-container">
      <ion-icon :icon="personCircleOutline"></ion-icon>
      <ion-label>Login</ion-label>
    </div>
  </ion-button>
  <ion-button v-else @click="logout">
    <div class="button-container">
      <ion-icon :icon="personCircleOutline"></ion-icon>
      <ion-label>Logout</ion-label>
    </div>
  </ion-button>
</template>

<script>
import {IonButton, IonIcon, IonLabel} from "@ionic/vue";
import {personCircleOutline} from "ionicons/icons";
import {mapActions, mapState} from 'vuex'
import router from "@/router";
export default {
  name: "HeaderAuthButton",
  components:{IonButton, IonIcon,IonLabel},
  methods:{
    ...mapActions('auth',['logoutUser']),
    logout(){
      this.logoutUser().then(() => {
          router.push('/login');
      })
    }
  },
  computed:{
    ...mapState('auth',['loggedIn'])
  },
  setup() {
    return {personCircleOutline}
  }
}
</script>

<style scoped>
.button-container{
  display: grid;
  grid-template-rows: 70% 30% ;
  justify-items: center;
}
ion-icon{
  font-size:1.5em
}
</style>