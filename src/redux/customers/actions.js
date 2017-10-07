//import { customers } from './reducer';

function ascendingSort(customer1, customer2) {
  const name1 = customer1.name ? customer1.name.toUpperCase() : '~';
  const name2 = customer2.name ? customer2.name.toUpperCase() : '~';
  return name1 > name2 ? 1 : name1 === name2 ? 0 : -1;
}

const customerActions = {
  ADD_CUSTOMER: 'ADD_CUSTOMER',
  EDIT_CUSTOMER: 'EDIT_CUSTOMER',
  DELETE__CUSTOMER: 'DELETE__CUSTOMER',
  CHANGE_CUSTOMER: 'CHANGE_CUSTOMER',
  EDIT_CUSTOMER_VIEW: 'EDIT_CUSTOMER_VIEW',
  SET_CUSTOMER: 'SET_CUSTOMER',
  changeCustomer: (id) => ({
    type: customerActions.CHANGE_CUSTOMER,
    id,
  }),
  addCustomer: () => {
    const newCustomer = {
      id: '2r3e7n5z',
      firstname: '',
      avatar: '',
      lastname: '',
      mobile: '',
      home: '',
      name: '',
      company: '',
      work: '',
      note: '',
    };
    return (dispatch, getState) => {
      dispatch({
        type: customerActions.ADD_CUSTOMER,
        customers: [...getState().Customers.get('customers'), newCustomer],
        selectedId: newCustomer.id,
      });
    };
  },
  editCustomer: (newCustomer) => {
    return (dispatch, getState) => {
      const customers = getState().Customers.get('customers');
      const newCustomers = [];
      customers.forEach(customer => {
        if (customer.id === newCustomer.id) {
          newCustomers.push(newCustomer);
        } else {
          newCustomers.push(customer);
        }
      });
      dispatch({
        type: customerActions.EDIT_CUSTOMER,
        customers: newCustomers.sort(ascendingSort),
      });
    }
  },
  deleteCustomer: (id) => {
    return (dispatch, getState) => {
      const customers = getState().Customers.get('customers');
      const selectedId = getState().Customers.get('selectedId');
      const newCustomers = [];
      customers.forEach(customer => {
        if (customer.id === id) {
        } else {
          newCustomers.push(customer);
        }
      });
      dispatch({
        type: customerActions.DELETE__CUSTOMER,
        customers: newCustomers,
        selectedId: id === selectedId ? undefined : selectedId,
      });
    };
  },
  viewChange: (view) => ({
    type: customerActions.EDIT_CUSTOMER_VIEW,
    view,
  }),
  setCustomer: (customers) => ({
    type: customerActions.SET_CUSTOMER,
    customers
  })
};
export default customerActions;