import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom'
import WizardFormFirstPage from './WizardFormFirstPage'
import WizardFormSecondPage from './WizardFormSecondPage'
import WizardFormThirdPage from './WizardFormThirdPage'


class WizardForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    
    this.state = {
      page: 1,
      error: []
    }
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }
  
  handleSubmit(values) {
    this.props.createWizard(values)
      .then((response) => {
        if (response.data.createWizard.error === undefined) {
            window.location.pathname = `dashboard/customers`
        } else {
          this.setState({
            error: response.data.createWizard.error
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
  

  render() {
    console.log(this.props);
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <div>
        {page === 1 && 
          <WizardFormFirstPage
            onSubmit={this.nextPage} 
          />}
        {page === 2 &&
          <WizardFormSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />}
        {page === 3 &&
          <WizardFormThirdPage
            previousPage={this.previousPage}
            onSubmit={this.handleSubmit.bind(this)}
          />}
      </div>
    )
  }
}
const wizardMutation = gql`
  mutation createWizard($firstName: String!, $lastName: String!, $email: String!, $sex: String!, $employed: Boolean!, $notes: String!, $favoriteColor: String!){
    createWizard(firstName: $firstName, lastName: $lastName, sex: $sex, employed: $employed, notes: $notes, favoriteColor: $favoriteColor, email: $email){
      id
      firstName
      lastName
      email
      employed
      favoriteColor
      sex
      notes
    }
  }
`
const WizardWithData = graphql(wizardMutation, {
  props: ({ mutate }) => ({
    createWizard: ({ firstName, lastName, email, employed, favoriteColor, sex, notes }) => mutate({
      variables: { firstName, lastName, email, employed, favoriteColor, sex, notes }
    }),
  }),
})(WizardForm);


export default withRouter(WizardWithData)

