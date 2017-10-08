import React from 'react'
import gql from 'graphql-tag';
import { Button } from 'antd'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { Layout } from "antd";
import Loading from '../Loading';
import PageHeader from '../../components/utility/pageHeader';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import IntlMessages from '../../components/utility/intlMessages';
import { GoogleMap, withGoogleMap, Marker, withScriptjs, TrafficLayer } from 'react-google-maps'
import _ from 'lodash'
import SingleSetUpView from '../../components/setUps/singleView';




const locationAttributes = [
  { title: 'Street', value: 'street', type: 'text' },
  { title: 'City', value: 'city', type: 'text' },
  { title: 'State', value: 'state', type: 'text' },
  { title: 'Zip', value: 'zip', type: 'text' }
];
const { Sider, Content } = Layout;

class SetUpPage extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {};
    this.backButton = this.backButton.bind(this)
    this.buttonTest = this.buttonTest.bind(this)
  }

  backButton() {
    console.log('button was clicked');
    this.props.history.push('/dashboard/setups')
  }

  buttonTest () {
    console.log('clicked...')
  }

  onSubmit = async () => {
    // const {active, setup } = this.state;
    await this.props.updateOilAccountState({variables: { id: this.props.data.SetUpService.service.oilService.oilAccountState.id, active: false, setup: true }});
    this.props.history.push('/dashboard/pendingSetups')

    //window.location.pathname = '/setups'
  }


  render() {
    console.log(this.props);
    if (this.props.data && this.props.data.loading) { 
      return (
        <Loading/>
      )
    }
    if (this.props.data && this.props.data.error) { return (<div>Error...</div>)}
    
  const FetchV2GoogleMap =  _.flowRight( withScriptjs, withGoogleMap ) (props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={15}
        defaultCenter={{ lat: this.props.data.SetUpService.service.location.lat, lng: this.props.data.SetUpService.service.location.lng }}
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
      <LayoutWrapper className="isomorphicSetUps" style={{ background: "none" }}>
        <PageHeader><IntlMessages id="setUpPage.setUpPageHeader" /></PageHeader>
          <Layout className="isomorphicSetUps" style={{ background: "none" }}>
        <Sider width="300" className="isoSetUpListBar">
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
                  lat: this.props.data.SetUpService.service.location.lat,
                  lng: this.props.data.SetUpService.service.location.lng,
                },
                key: `id`,
                defaultAnimation: 2,
              }]}
              onMarkerClick={this.handleMarkerClick}
              onMarkerClose={this.handleMarkerClose}
            />
          </div>
        </Sider>
          <Layout className="isoSetUpBoxWrapper" >
            <Content className="isoSetUpBox">
              <SingleSetUpView 
                setUp={this.props.data.SetUpService}
                location={this.props.data.SetUpService.service.location}
                locationAttributes={locationAttributes}
              />
            </Content>
            <Content className="isoSetUpControl">

              <Button onClick={this.onSubmit} className="isoSetUpBtn" type="primary">Complete Set Up</Button>

            </Content>
            </Layout>
          </Layout>
      </LayoutWrapper>
      
    )
  }
}


// update w/ react-router v4 url params api
//
// see documentation on computing query variables from props in wrapper
// http://dev.apollodata.com/react/queries.html#options-from-props
const SetUpQuery = gql`
query SetUp($id: ID!){
  SetUpService(id: $id) {
   id
   setUpDate
   setUpNotes{
     id
     setUpNoteContent
   }
   service{
     id
     location{
       id
       lat
       lng
       locationName
       street
       state
       zip
       city
     }
     oilService{
       id
       cycle
       pickUpType
       startDate
       oilAccountState{
         id
         active
       }
       containment{
         id
         type
         quantity
       }
     }
   }
   
 }
}
`;

const updateAccountState = gql`
mutation updateOilAccountState($id: ID!,  $active: Boolean, $setup: Boolean){
updateOilAccountState(id: $id, active: $active, setup: $setup){
  id
  oilService{
    id
    startDate
    containment{
      id
      type
      size
      quantity
    }
    oilAccountState{
      id
      active
      setup
    }
    service{
      id
      location{
        id
        locationName
        street
        state
        city
        
      }
    }
  }
}
}
`



// update w/ react-router v4 url params api
//
// see documentation on computing query variables from props in wrapper
// http://dev.apollodata.com/react/queries.html#options-from-props
const SetUpPageWithData = graphql(SetUpQuery, {
options: ({match}) => ({
  variables: {
    id: match.params.id,
  },
}),
})(SetUpPage);

const SetUpPageWithUpdate = graphql(updateAccountState, {name: 'updateOilAccountState'})(SetUpPageWithData);

export default withRouter(SetUpPageWithUpdate)