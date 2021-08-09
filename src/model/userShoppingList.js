export default class UserShoppingList{
    constructor(userId) {
        this.userId = userId;
        this.shoppingListDTO = {
            id:null,
            title:'Unnamed list',
            location:null
        }
    }
}