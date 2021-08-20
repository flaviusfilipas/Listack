export default class ContributorInvitation{
    constructor(email,listId) {
        this.id=null;
        this.email=email;
        this.status="PENDING";
        this.sentEmail=false;
        this.shoppingListId=listId;
    }
}