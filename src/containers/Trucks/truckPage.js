import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { Layout } from "antd";
import Loading from '../Loading';
import PageHeader from '../../components/utility/pageHeader';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import IntlMessages from '../../components/utility/intlMessages';
import VCardWidget from '../WidgetCollection/vCard/vCard-widget';
import IsoWidgetsWrapper from '../WidgetCollection/widgets-wrapper';
import SingleProgressWidget from '../WidgetCollection/progress/progress-single';
import ReportsWidget from '../WidgetCollection/report/report-widget';


const { Sider, Content } = Layout;


class Truck extends React.Component {
  render() {
    if (this.props.data && this.props.data.loading) { return ( <Loading/> )}
    if (this.props.data && this.props.data.error) { return (<div>Error...</div>)}
    console.log(this.props)
    return(
      <LayoutWrapper className="isomorphicTrucks" style={{ background: "none" }}>
      <PageHeader>{this.props.data.Truck.name}</PageHeader>
        <Sider width="300" className="isoTruckListBar" >
          <VCardWidget
            style={{ height: '450px' }}
            src={this.props.data.Truck.image}
            alt="Just a truck..."
            name={this.props.data.Truck.name}
            title={this.props.data.Truck.nickname}
            description={this.props.data.Truck.description}
          />
        </Sider>
          <Content className="isoTruckBox">
          <IsoWidgetsWrapper>
              {/* Report Widget */}
              <ReportsWidget
                label={<IntlMessages id="widget.truckCapacity.progress" />}
                details={<IntlMessages id="widget.truckCapacity.details" />}
              >
                <SingleProgressWidget
                  label={
                    <IntlMessages id="widget.truckCapacity.progress.label" />
                  }
                  percent={73}
                  barHeight={10}
                  //status="active"
                  info={true} // Boolean: true, false
                />
              </ReportsWidget>
            </IsoWidgetsWrapper>
          </Content>
      </LayoutWrapper>
       );
  }
};

const TruckQuery = gql`
query truck($id: ID!){
  Truck(id: $id){
    id
    image
    name
    description
    nickname
    createdAt
    updatedAt
  }
}
`;

// update w/ react-router v4 url params api
//
// see documentation on computing query variables from props in wrapper
// http://dev.apollodata.com/react/queries.html#options-from-props
const TruckPageWithData = graphql(TruckQuery, {
options: ({ match }) => ({
  variables: {
    id: match.params.id,
  },
}),
})(Truck);


export default withRouter(TruckPageWithData)