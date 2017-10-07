import React from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'
import {withRouter} from 'react-router-dom'
import { Layout } from "antd";
import { GoogleMap, withGoogleMap, Marker, withScriptjs, TrafficLayer } from 'react-google-maps'
import _ from 'lodash'
import SingleLocationView from '../../components/locations/singleView';




const locationAttributes = [
  { title: 'Street', value: 'street', type: 'text' },
  { title: 'City', value: 'city', type: 'text' },
  { title: 'State', value: 'state', type: 'text' },
  { title: 'Zip', value: 'zip', type: 'text' },
  { title: 'Customer', value: 'firstname', type: 'text' }
];

const customerAttributes = [
  { title: 'First Name', value: 'firstname', type: 'text' },
  { title: 'Last Name', value: 'lastname', type: 'text' },

];

const { Sider, Content } = Layout;

class LocationPage extends React.Component {
  
  render() {
    console.log(this.props);
    if (this.props.data && this.props.data.loading) { return (<div>Loading...</div>)}
    if (this.props.data && this.props.data.error) { return (<div>Error...</div>)}
    
  const FetchV2GoogleMap =  _.flowRight( withScriptjs, withGoogleMap ) (props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={15}
        defaultCenter={{ lat: this.props.data.Location.lat, lng: this.props.data.Location.lng }}
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
      <Layout className="isomorphicLocations" style={{ background: "none" }}>
        <Sider width="300" className="isoLocationListBar">
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
              lat: this.props.data.Location.lat,
              lng: this.props.data.Location.lng,
            },
            key: `id`,
            defaultAnimation: 2,
          }]}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
        />
      </div>
        </Sider>
        <Layout className="isoLocationBoxWrapper" >
          <Content className="isoLocationBox">
            <SingleLocationView 
              location={this.props.data.Location}
              locationAttributes={locationAttributes}
              customer={this.props.data.Location.customer}
              customerAttributes={customerAttributes}
            />
          </Content>
        </Layout>
      </Layout>
    )
  }
}
const LocationQuery = gql`
query location($id: ID!) {
  Location(id: $id) {
    id
    locationName
    street
    city
    state
    zip
    lat
    lng
    customer {
      id
      firstname
      lastname
    }
  }
}
`;

// update w/ react-router v4 url params api
//
// see documentation on computing query variables from props in wrapper
// http://dev.apollodata.com/react/queries.html#options-from-props
const LocationPageWithData = graphql(LocationQuery, {
options: ({ match }) => ({
  variables: {
    id: match.params.id,
  },
}),
})(LocationPage);


export default withRouter(LocationPageWithData)