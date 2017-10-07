import { Map } from "immutable";
import customerActions from "./actions";

const customers = [];

const initState = new Map({
  customers,
  selectedId: '',
  editCustomerView: false
});


export default function customerReducer(state = initState, action) {
  switch (action.type) {
    case customerActions.CHANGE_CUSTOMER:
      return state.set("selectedId", action.id).set("editView", false);
    case customerActions.ADD_CUSTOMER:
      return state
        .set("customers", action.customers)
        .set("selectedId", action.selectedId)
        .set("editCustomerView", true);
    case customerActions.EDIT_CUSTOMER:
      return state.set("customers", action.customers);
    case customerActions.DELETE__CUSTOMER:
      return state
        .set("customers", action.customers)
        .set("selectedId", action.selectedId);
    case customerActions.EDIT_CUSTOMER_VIEW:
      return state.set("editCustomerView", action.view);
    case customerActions.SET_CUSTOMER:
      return state.set("customers", action.customers);
    default:
      return state;
  }
}

export { customers };
