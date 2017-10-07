import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { withScriptjs, GoogleMap, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { withApollo, graphql, gql } from 'react-apollo';
import { Col, Thumbnail } from 'react-bootstrap';
import './locationsMap.css';


const allLocations = gql`
    query allLocations {
        allLocations {
            id
            locationName
            street
            city
            state
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

const FetchV2GoogleMap =  _.flowRight(
      withScriptjs,
      withGoogleMap,
      ) (props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={8}
        defaultCenter={{ lat: 39.8407815, lng: -75.3695485 }}
        onClick={props.onMapClick}
        defaultOptions={{
          disableDefaultUI: false,
          scrollwheel: false
          
        }}
      >
        {Boolean(props.markers) && props.markers.map((marker , index) => (
          <Marker
            {...marker}
            showInfo={false}
            icon={marker.isOwnMarker ? require('../../../assets/marker_blue.svg') : require('../../../assets/marker.svg')}
            onClick={() => props.onMarkerClick(marker)}
            defaultAnimation={2}
            key={index}
          >
            {marker.showInfo && (
              <InfoWindow
                onCloseClick={() => props.onMarkerClose(marker)}>
                <Link to={`/locations/${marker.id}`}>
                  <Col xs={12} md={12}>
                    <Thumbnail src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Tom%27s_Restaurant%2C_NYC.jpg/220px-Tom%27s_Restaurant%2C_NYC.jpg"} alt="242x200">
                      <h3>{marker.locationName}</h3>
                      <p>{marker.street}</p>
                      <p>{marker.city}</p>
                      <p>{marker.state}</p>
                      <p>{marker.zip}</p>
                    </Thumbnail>
                  </Col>
                </Link>
              </InfoWindow>
            )}
          </Marker>
        ))}
        {/*<TrafficLayer autoUpdate />*/}
      </GoogleMap>
    )
  );


class LocationsMap extends Component {

  state = {
    markers: [],
    // customerId: undefined,
    location: undefined,
  };

  async componentDidMount() {

    this.locationSubscription = this.props.allLocationsQuery.subscribeToMore({
      document: gql`
          subscription {
              Location(filter: {
                mutation_in: [CREATED, UPDATED]
              }) {
                  mutation
                  node {
                      id
                      locationName
                      street
                      city
                      state
                      lat
                      lng
                      customer {
                          id
                          firstname
                          lastname
                      }
                  }
              }
          }
      `,
      variables: null,
      updateQuery: (previousState, {subscriptionData}) => {
        if (subscriptionData.data.Location.mutation === 'CREATED') {
          const newLocation = subscriptionData.data.Location.node;
          const locations = previousState.allLocations.concat([newLocation]);
          return {
            allLocations: locations,
          }
        }
        else if (subscriptionData.data.Location.mutation === 'UPDATED') {
          const locations = previousState.allLocations.slice();
          const updatedLocation = subscriptionData.data.Location.node;
          const oldLocationIndex = locations.findIndex(location => {
            return updatedLocation.id === location.id
          });
          locations[oldLocationIndex] = updatedLocation;
          return {
            allLocations: locations,
          }
        }

        return previousState
      }
    });
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.allLocationsQuery.allLocations) {
      const newMarkers = nextProps.allLocationsQuery.allLocations.map(location => {
        const isOwnMarker = location.id === this.state.location
        return {
          id: location.id,
          locationName: isOwnMarker ? location.locationName + ' (You)' : location.locationName,
          street: location.street,
          city: location.city,
          state: location.state,
          position: {
            lat: location.lat,
            lng: location.lng,
          },
        }
      });
      this.setState({
        markers: newMarkers,
      })
    }

  }

  // _removeAllMarkers() {
  //   const newMarkers = this.state.markers.slice();
  //   newMarkers.forEach(marker => {
  //     marker.showInfo = false
  //   })
  //   this.setState({
  //     markers: newMarkers,
  //   })
  // }
  //
  // _updateExistingCustomer = async (customerId) => {
  //
  //   this.setState({
  //     customerId: customerId
  //   });
  //
  //   // Check for customer with this Id
  //   const customerForIdResponse = await this.props.client.query(
  //     {
  //       query: customerForId,
  //       variables: {
  //         id: customerId,
  //       },
  //     }
  //   );
  //
  //   console.log('Update existing customer: ', customerForIdResponse);
  //   const existingCustomer = customerForIdResponse.data.Customer;
  //   console.log('existingCustomer: ', existingCustomer)
  //
  // };

  handleMapLoad = this.handleMapLoad.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleMarkerClose = this.handleMarkerClose.bind(this);

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          }
        }
        return marker
      }),
    })
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          }
        }
        return marker
      }),
    })
  }

  handleMapLoad(map) {
    this._mapComponent = map
  }

  handleMapClick() {
    this._removeAllMarkers()
  }

  render() {
    return (
      <div style={{height: `100%`}}>
        <FetchV2GoogleMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCCH6ORS-0oa4Jj3uy7DrB2cXPqMEu7Tgg"
          loadingElement={
            <div style={{height: `600px`}}>
              Loading
            </div>
          }
          containerElement={
            <div style={{ height: `600px` }} />
          }
          mapElement={
            <div style={{ height: `600px` }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
        />
      </div>
    )
  }
}

export default withApollo(
  graphql(allLocations, {name: 'allLocationsQuery'})(LocationsMap)

)
