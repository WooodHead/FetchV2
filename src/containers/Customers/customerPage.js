import React from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'
import {withRouter} from 'react-router-dom'
import { Layout } from "antd";
import { GoogleMap, withGoogleMap, Marker, withScriptjs, TrafficLayer } from 'react-google-maps'
import _ from 'lodash'
import SingleCustomerView from '../../components/customers/singleView';
import UpdateButton from '../../components/customers/updateButton/updateButton'
import { Link } from 'react-router-dom'



const customerAttributes = [
  { title: 'Phone', value: 'phone', type: 'phoneNumber' },
  { title: 'Email', value: 'email', type: 'email' },
  { title: 'Role', value: 'role', type: 'text' },
];
// const customerNoteAttributes = [
//   { title: 'Notes', value: 'customerNoteContent', type: 'paragraph' }
// ];
const { Sider, Content } = Layout;

class CustomerPage extends React.Component {
  
  render() {
    console.log(this.props);
    if (this.props.data && this.props.data.loading) { return (<div>Loading...</div>)}
    if (this.props.data && this.props.data.error) { return (<div>Error...</div>)}
    
  const FetchV2GoogleMap =  _.flowRight( withScriptjs, withGoogleMap ) (props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={15}
        defaultCenter={{ lat: this.props.data.Customer.locations[0].lat, lng: this.props.data.Customer.locations[0].lng }}
        onClick={props.onMapClick}
        defaultOptions={{
          disableDefaultUI: false,
          scrollwheel: false,
        }}
      >
        {props.markers.map(marker => (
          <Marker
            {...marker}
          />
        ))}

        <TrafficLayer autoUpdate />
      </GoogleMap>
    )
  );

    return(
      <Layout className="isomorphicCustomers" style={{ background: "none" }}>
        <Sider width="300" className="isoCustomerListBar">
        <div style={{height: `100%`}}>
        <FetchV2GoogleMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?libraries=visualization&key=AIzaSyCCH6ORS-0oa4Jj3uy7DrB2cXPqMEu7Tgg"
          loadingElement={
            <div style={{height: `400px`}}>
              Loading
            </div>
          }
          containerElement={
            <div style={{ height: `400px` }} />
          }
          mapElement={
            <div style={{ height: `400px` }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={[{
            position: {
              lat: this.props.data.Customer.locations[0].lat,
              lng: this.props.data.Customer.locations[0].lng,
            },
            key: `id`,
            defaultAnimation: 2,
          }]}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
        />
      </div>
        </Sider>
        <Layout className="isoCustomerBoxWrapper" >
          <Content className="isoCustomerBox">
            <SingleCustomerView 
              customer={this.props.data.Customer}
              customerAttributes={customerAttributes}
              //customerNoteAttributes={customerNoteAttributes}
              customerNote={this.props.data.Customer.customerNotes}
            />
          </Content>
          <Content className="isoCustomerControls">
          <Link to={`/dashboard/customers/${this.props.data.Customer.id}/edit`} >
          <UpdateButton className="isoUpdateCustomerBtn"/>
          </Link>
            
          </Content>
          
        </Layout>
      </Layout>
    )
  }
}
const CustomerQuery = gql`
query customer($id: ID!){
  Customer(id: $id){
  id
  avatar
  firstname
  lastname
  role
  email
  phone
  customerNotes{
    id
    customerNoteContent
  }
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
const CustomerPageWithData = graphql(CustomerQuery, {
options: ({ match }) => ({
  variables: {
    id: match.params.id,
  },
}),
})(CustomerPage);


export default withRouter(CustomerPageWithData)