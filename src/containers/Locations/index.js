import React from 'react';
import { gql, graphql, withApollo } from 'react-apollo';
import { Layout } from "antd";
import LocationList from '../../components/locations/locationList';
import LocationsMap from '../../components/maps/locations/locationsMap';

const { Sider, Content } = Layout;



class Locations extends React.Component {

  async componentDidMount() {
    
        this.locationSubscription = this.props.Locations.subscribeToMore({
          document: gql`
              subscription {
                  Location(filter: {
                    mutation_in: [CREATED, UPDATED]
                  }) {
                      mutation
                      node {
                          id
                          createdAt
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

  render() {
    if (this.props.Locations && this.props.Locations.loading) { return (<div>Loading...</div>)}
    if (this.props.Locations && this.props.Locations.error) { return (<div>Error...</div>)}
    const {
      allLocations
    } = this.props.Locations
    console.log(this.props);
    return(
      <Layout className="isomorphicLocations" style={{ background: "none" }}>
        <Sider width="300" className="isoLocationListBar" >
          <LocationList
            locations={allLocations}
          />
        </Sider>
        <Content>
          <LocationsMap 
            allLocations={allLocations}
          />
        </Content>
      </Layout>
    )
  }
}

const LocationQuery = gql`
query Locations {
  allLocations(orderBy: createdAt_DESC) {
    id
    createdAt
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

const LocationIndexPageWithData = withApollo(graphql(LocationQuery, {
  name: 'Locations',
  options: {
    fetchPolicy: 'network-only'
  },
})(Locations));

export default LocationIndexPageWithData


