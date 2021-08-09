<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import {mapActions} from "vuex";

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  methods:{
    ...mapActions('auth', ['handleAuthStateChange'])
  },
  mounted() {
    this.handleAuthStateChange();
  }
});
</script>