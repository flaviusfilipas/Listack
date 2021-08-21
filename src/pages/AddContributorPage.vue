<script>
import {mapActions, mapMutations} from "vuex";
import ShoppingListContributor from "@/model/shoppingListContributor";
import router from "@/router";
import {SpinnerDialog} from '@ionic-native/spinner-dialog';

export default {
  name: "AddContributorPage",
  methods: {
    ...mapActions('lists', {addContributorAction: 'addContributor'}),
    ...mapMutations('lists', {addContributorMutation: 'addContributor'}),
    addContributor() {
      SpinnerDialog.show()
      const queryParams = this.$route.query
      const contributor = new ShoppingListContributor(queryParams.listId, queryParams.userId)
      this.addContributorAction(contributor)
          .then(response => {
            this.addContributorMutation(response.data)
            SpinnerDialog.hide();
            router.push("/home")
          }).catch(error => {
        console.log("Error " + error)
      })
    }
  },
  mounted() {
    this.addContributor()
  }
}

</script>

<style scoped>

</style>