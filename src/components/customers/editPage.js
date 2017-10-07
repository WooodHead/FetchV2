import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'
import {withRouter} from 'react-router-dom'
import { Col, Row } from 'antd';
import Input from '../../components/uielements/input';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import ContentHolder from '../../components/utility/contentHolder';
import IntlMessages from '../../components/utility/intlMessages';

const InputGroup = Input.Group;



class EditCustomerPage extends Component {

  constructor(props){
    super(props)
    console.log(this.props)
  }

  state = {
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    role: '',
    note: ''
  };

  

  render() {
    if (this.props.data && this.props.data.loading) { return (<div>Loading...</div>)}
    if (this.props.data && this.props.data.error) { return (<div>Error...</div>)}
    console.log(this.state)
    console.log(this.props)

    const rowStyle = {
      width: '100%',
      display: 'flex',
      flexFlow: 'row wrap'
    };
    const colStyle = {
      marginBottom: '16px',
    };
    const gutter = 16;
    return (
      <LayoutWrapper>
        <PageHeader><IntlMessages id="forms.customer.update.header" /></PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box 
              title={<IntlMessages id="forms.customer.input.basicTitle" />}
              subtitle={`You are editing ${this.props.data.Customer.firstname} ${this.props.data.Customer.lastname}`}
            >
              <ContentHolder>
                <InputGroup size="large" style={{ marginBottom: '15px' }}>
                <Input 
                  placeholder={this.props.data.Customer.firstname}
                  style={{ marginBottom: '15px' }} 
                  onChange={event => this.setState({ firstname: event.target.value })}
                  value={this.state.firstname}
                />
                <Input 
                  placeholder="Last Name" 
                  style={{ marginBottom: '15px' }}
                  onChange={event => this.setState({ lastname: event.target.value })}
                  value={this.state.lastname}
                />
                <Input 
                  placeholder="Phone" 
                  style={{ marginBottom: '15px' }}
                  onChange={event => this.setState({ phone: event.target.value })}
                  value={this.state.phone}
                />
                <Input 
                  placeholder="Email" 
                  style={{ marginBottom: '15px' }}
                  onChange={event => this.setState({ email: event.target.value })}
                  value={this.state.email}
                />
                <Input 
                  placeholder="Role" 
                  style={{ marginBottom: '15px' }}
                  onChange={event => this.setState({ role: event.target.value })}
                  value={this.state.role}
                />
                <Input 
                  placeholder="Notes:"  
                  type="textarea" 
                  rows={10} 
                  autosize={{ minRows: 6, maxRows: 10 }}
                  onChange={event => this.setState({ note: event.target.value })}
                  value={this.state.note}
                />
                </InputGroup> 
                <button onClick={this.onSubmit}>Update Customer</button>   
              </ContentHolder>
            </Box>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box
              title={<IntlMessages id="forms.customer.input.variationsTitle" />}
            >
              <ContentHolder>
                <div>
                  <h4>Pre-Edit Details</h4>
                  <li>First Name: {this.props.data.Customer.firstname} </li>
                  <li>Last Name: {this.props.data.Customer.lastname}</li>
                  <li>Phone: {this.props.data.Customer.phone}</li>
                  <li>Email: {this.props.data.Customer.email}</li>
                  <li>Role: {this.props.data.Customer.role}</li>
                  <li>Note: {this.props.data.Customer.note}</li>
                </div> 
                <div>
                
                  <h4>Changes To Customer</h4>
                  <li>First Name: {this.state.firstname} </li>
                  <li>Last Name: {this.state.lastname}</li>
                  <li>Phone: {this.state.phone}</li>
                  <li>Email: {this.state.email}</li>
                  <li>Role: {this.state.role}</li>
                  <li>Note: {this.state.note}</li>

                </div>  
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
  onSubmit = async () => {
    const { firstname, lastname, role, email, phone, note } = this.state;
    await this.props.UpdateCustomer({variables: { id: this.props.data.Customer.id, firstname, lastname, role, email, phone, note }});

     window.location.pathname = `/dashboard/customers/${this.props.data.Customer.id}`
  }
}

const UpdateCustomerMutation = gql`
mutation UpdateCustomer($id: ID!, $firstname: String!, $lastname: String!, $role: String!, $email: String!, $phone: String!, $note: String!) {
updateCustomer(id: $id, firstname: $firstname, lastname: $lastname, role: $role, email: $email, phone: $phone, note: $note) {
  id
  firstname
  role
  email
  lastname
  phone
  note
}
}
`;
const EditCustomerQuery = gql`
query customer($id: ID!){
  Customer(id: $id){
  id
  avatar
  firstname
  lastname
  role
  email
  phone
  note
  locations{
    locationName
    city
    state
    lat
    lng
  }
}
}
`;

// update w/ react-router v4 url params api
//
// see documentation on computing query variables from props in wrapper
// http://dev.apollodata.com/react/queries.html#options-from-props
const EditCustomerPageWithData = graphql(EditCustomerQuery, {
options: ({ match }) => ({
  variables: {
    id: match.params.id,
  },
}),
})(EditCustomerPage);

const EditCustomerPageWithUpdate = graphql(UpdateCustomerMutation, {name: 'UpdateCustomer'})(EditCustomerPageWithData)


export default withRouter(EditCustomerPageWithUpdate)

