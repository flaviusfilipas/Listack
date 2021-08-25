<template>
  <ion-page>
    <auth-layout title="Register">
      <ion-content>
        <v-form @submit="register">
          <auth-name-input @emitNameValue="setNameValue"/>
          <auth-email-input @emitEmailValue="setEmailValue"/>
          <auth-password-input @emitPasswordValue="setPasswordValue"/>
          <auth-button button-title="Register"/>
        </v-form>
      </ion-content>
    </auth-layout>
  </ion-page>
</template>

<script>
import {IonContent, IonPage} from '@ionic/vue'
import AuthLayout from '../components/layout/AuthLayout.vue'
import {personOutline} from "ionicons/icons";
import {mapActions} from "vuex";
import {SpinnerDialog} from '@ionic-native/spinner-dialog';
import {Dialogs} from '@ionic-native/dialogs'
import axios from 'axios'
import router from "@/router";
import ShoppingListContributor from "@/model/shoppingListContributor";
import AuthEmailInput from "@/components/inputs/AuthEmailInput";
import AuthPasswordInput from "@/components/inputs/AuthPasswordInput";
import AuthButton from "@/components/buttons/AuthButton";
import {Form} from 'vee-validate'
import AuthNameInput from "@/components/inputs/AuthNameInput";

export default {
  name: "Register",
  components: {
    AuthNameInput,
    AuthButton,
    AuthPasswordInput,
    AuthEmailInput,
    VForm: Form,
    IonPage, IonContent, AuthLayout,
  },
  data() {
    return {
      email: '',
      password: '',
      name: '',
    }
  },
  methods: {
    ...mapActions('lists', ['addContributor', 'approveContributorInvitation']),
    ...mapActions('auth', ['registerUser']),
    setEmailValue(value) {
      this.email = value
    },
    setPasswordValue(value) {
      this.password = value
    },
    setNameValue(value) {
      this.name = value
    },
    handleLocalRegistration(firebaseResponse) {
      axios.post('/api/users', {id: firebaseResponse.user.uid, name: this.name, email: this.email})
          .then(() => {
            if (this.$route.query.signUpFromEmail) {
              const listId = this.$route.query.listId
              let contributor = new ShoppingListContributor(listId, firebaseResponse.user.uid)
              this.addContributor(contributor)
              this.approveContributorInvitation({
                userId: firebaseResponse.user.uid,
                listId: this.$route.query.listId
              })
            }
            SpinnerDialog.hide()
            router.push("/home");
          }).catch(() => {
        Dialogs.alert("Something went wrong", "Error", "Ok")
        SpinnerDialog.hide()
      })
    },

    register() {
      SpinnerDialog.show();
      this.registerUser({email: this.email, password: this.password, name: this.name})
          .then(response => {
            this.handleLocalRegistration(response)
          }).catch(error => {
        Dialogs.alert(error.message, "Error", "Ok")
        SpinnerDialog.hide()
      })
    }
  },
  setup() {
    return {
      personOutline
    }
  }
}
</script>

