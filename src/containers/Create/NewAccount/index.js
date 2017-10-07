import React from 'react';
//import  moment from 'moment'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom'
import CustomerForm from '../../../components/create/CustomerForm'
import LocationForm from '../../../components/create/LocationForm'
import SetUpForm from '../../../components/create/SetUpForm'
import ServiceForm from '../../../components/create/ServiceForm'
import { steps } from './ProgressBar/steps'
import './css/skeleton.css'
import './css/prog-tracker.css'
import './css/custom.css'
import './css/normalize.css'

class CreateNewAccount extends React.Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    
    this.state = {
      page: 1,
      error: [],
      pageState: 0,      
      navState: this.getNavStates(0, steps.length)
      
    }
  }
  //
  //Progress Bar Functions
  //
  getNavStates(indx, length) {
    let styles = [];
    for (let i=0; i<length; i++) {
      if(i < indx) {
        styles.push('done')
      }
      else if(i === indx) {
        styles.push('doing')
      }
      else {
        styles.push('todo')
      }
    }
    return { current: indx, styles: styles }
  }
  setNavState(next) {
    this.setState({navState: this.getNavStates(next, steps.length)})
  }
  getClassName(className, i){
    return className + "-" + this.state.navState.styles[i];
  }
  renderSteps() {
    return steps.map((s, i)=> (
      <li className={this.getClassName("progtrckr", i)} onClick={this.handleOnClick} key={i} value={i}>
        <em>{i+1}</em>
        <span>{steps[i].name}</span>
      </li>
    ));
  }
  // Two progress bar actions below - setNavState
  nextPage() {
    this.setState({ 
      page: this.state.page + 1,
      pageState: this.state.pageState + 1
    })
    this.setNavState(this.state.pageState + 1)    
  }
  previousPage() {
    this.setState({ 
      page: this.state.page - 1,
      pageState: this.state.pageState - 1
     })
    this.setNavState(this.state.pageState - 1)    
  }

// Submit Function 
  handleSubmit(values) {
    this.props.createLocation(values)
      .then((response) => {
        if (response.data.createLocation.error === undefined) {
            window.location.pathname = `dashboard/pendingSetups`
        } else {
          this.setState({
            error: response.data.createLocation.error
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    console.log(this.state);
    //const { onSubmit } = this.props
    const { page } = this.state
    return(
    <div className="isoLayoutContentWrapper" style={{height: "100vh"}}>
      <div className="isoLayoutContent">
        <h1>Create New Account</h1>
        <ol className="progtrckr">
          {this.renderSteps()}
        </ol>
          <div>
          {page === 1 && 
            <CustomerForm
              onSubmit={this.nextPage} 
            />}
          {page === 2 &&
            <LocationForm
              previousPage={this.previousPage}
              onSubmit={this.nextPage}
            />}
          {page === 3 &&
            <SetUpForm
              previousPage={this.previousPage}
              onSubmit={this.nextPage}
            />}
          {page === 4 &&
            <ServiceForm
              previousPage={this.previousPage}
              onSubmit={this.handleSubmit.bind(this)}
            />}
        </div>
      </div>
    </div>);
  }
}

const createMutation = gql`
mutation NewCustomerOilService($zip: String!, $state: String!, $city: String!, $street: String!, $locationName: String!, $customer: LocationcustomerCustomer, $services: [LocationservicesService!], $locationNotes: [LocationlocationNotesLocationNote!]){
  createLocation(zip: $zip, state: $state, city: $city, street: $street, locationName: $locationName, customer: $customer, services: $services, locationNotes: $locationNotes){
    id
    locationName
    street
    city
    state
    zip
    customer{
      id
      firstname
      lastname
      email
      phone
      role
    }
    services{
      id
      setUpService{
        id
        setUpDate
        setUpNotes{
          setUpNoteContent
        }
      }
      oilService{
        id
        cycle
        pickUpType
        startDate
        containment{
          id
          type
          quantity
          size
        }
        oilAccountState{
          active
          setup
        }
      }
    }
  }
}
`
const WizardWithData = graphql(createMutation, {
props: ({ mutate }) => ({
  createLocation: ({       
    firstname,
    lastname,
    email,
    phone,
    role,
    customerNoteContent,
    locationName,
    street,
    city,
    state,
    zip,
    locationNoteContent,
    setUpDate,
    startDate,
    cycle,
    pickUpType,
    quantity,
    size,
    type,
    oilServiceNoteContent,
    setUpNoteContent }) => mutate({
    variables: {
      locationName,
      street,
      city,
      state,
      zip,
      locationNotes: [{
        locationNoteContent
      }],
      customer: {
        firstname,
        lastname,
        email,
        phone,
        role,
          customerNotes: [{
            customerNoteContent
          }]
        },
      services: [{
        setUpService: {
          setUpDate,
          setUpNotes: {
            setUpNoteContent
          }
        },
        oilService: {
          startDate,
          cycle: parseInt(cycle, 10),
          pickUpType,
          containment: {
            size: parseInt(size, 10),
            quantity: parseInt(quantity, 10),
            type
          },
          oilAccountState: {
            active: false,
            setup: false
          },
          oilServiceNotes: [{
            oilServiceNoteContent
          }]
        }
      }]
    }
  }),
}),
})(CreateNewAccount);


export default withRouter(WizardWithData)
