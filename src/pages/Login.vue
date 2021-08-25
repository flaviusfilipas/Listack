<template>
  <ion-page>
    <auth-layout title="Login">
      <ion-content>
        <v-form @submit="login">
          <auth-email-input @emitEmailValue="setEmailValue"/>
          <auth-password-input @emitPasswordValue="setPasswordValue"/>
          <div class="with-margins forgot-password">
            <span class="pointer-cursor" style="color: #cf3c4f">Forgot password?</span>
          </div>
          <auth-button button-title="Login"/>
        </v-form>
        <div class="sign-up-container with-margins">
          <h6>Don't have an account yet?</h6>
          <ion-button router-link='/register' fill="clear">Sign up</ion-button>
        </div>
      </ion-content>
    </auth-layout>
  </ion-page>
</template>

<script>
import {IonButton, IonContent, IonPage} from '@ionic/vue'
import AuthLayout from '../components/layout/AuthLayout.vue'
import {mapActions} from "vuex";
import {SpinnerDialog} from "@ionic-native/spinner-dialog";
import {Dialogs} from "@ionic-native/dialogs";
import router from "@/router";
import AuthEmailInput from "@/components/inputs/AuthEmailInput";
import AuthPasswordInput from "@/components/inputs/AuthPasswordInput";
import AuthButton from "@/components/buttons/AuthButton";
import {Form} from "vee-validate";

export default {
  name: 'Login',
  components: {
    VForm: Form,
    AuthButton,
    AuthPasswordInput,
    AuthEmailInput,
    IonPage,
    IonContent, AuthLayout,
    IonButton
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('auth', ['loginUser']),
    setEmailValue(value) {
      this.email = value
    },
    setPasswordValue(value) {
      this.password = value
    },
    login() {
      SpinnerDialog.show();
      this.loginUser({email: this.email, password: this.password})
          .then(() => {
            SpinnerDialog.hide();
            router.push('/home');
            this.email='';
            this.password=''
          }).catch(error => {
        SpinnerDialog.hide();
        Dialogs.alert(error.message, "Error", "Ok")
      })
    }
  }
}
</script>

<style>
.with-margins {
  margin: 16px 16px 16px 16px;
}

.pointer-cursor {
  cursor: pointer;
}

.sign-up-container {
  display: grid;
  grid-template-rows: 50% 50%;
  justify-items: center;
}

.forgot-password {
  text-align: right;
  font-size: smaller;
}
</style>