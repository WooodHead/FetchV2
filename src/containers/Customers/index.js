import React from 'react';
import { graphql, gql, withApollo } from 'react-apollo';

import { Layout } from "antd";
import basicStyle from '../../config/basicStyle';
import CustomerList from '../../components/customers/customerList';
import IsoWidgetsWrapper from '../Widgets/widgets-wrapper';
import IsoWidgetBox from '../Widgets/widget-box';
import { GoogleChart } from '../Charts/googleChart/';
import * as googleChartConfigs from '../Charts/googleChart/config';
import { Col, Row } from 'antd';

const { Sider, Content } = Layout;

class Customers extends React.Component {
  render() {
    const { rowStyle, colStyle } = basicStyle;
    const chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {
          console.log('Selected ', Chart.chart.getSelection());
        },
      },
    ];
    
    if (this.props.Customers.loading) {return <p>Loading...</p>;}
    const {
      allCustomers
    } = this.props.Customers;
//
    
    return (
      <Layout className="isomorphicCustomers" style={{ background: "none" }}>
      <Sider width="300" className="isoCustomerListBar" >
        <CustomerList
          customers={allCustomers}
        />
      </Sider>
      <Content className="isoCustomerBox">
                <div className="isoCustomerControl">
                <Row style={rowStyle} gutter={0} justify="start">
                <Col md={12} sm={24} xs={24} style={colStyle}>
                  <IsoWidgetsWrapper>
                    <IsoWidgetBox height={470}>
                      <GoogleChart
                        {...googleChartConfigs.BarChart}
                        chartEvents={chartEvents}
                      />
                    </IsoWidgetBox>
                  </IsoWidgetsWrapper>
                </Col>
              </Row>
                </div>      
            </Content>
    </Layout>
    )
  }
}



const allCustomersQuery = gql`
  query Customers {
    allCustomers(orderBy: createdAt_ASC) {
      id
      firstname
      lastname
      avatar
      phone
      email
      role
      customerNotes{
        customerNoteContent
      }
      locations {
        locationName
        services {
          id
          oilService {
            id
            cycle
            oilAccountState {
              id
            }
          }
        }
      }
    }
  }
`;

  const CustomerIndexPageWithData = withApollo(graphql(allCustomersQuery, {
    name: 'Customers',
    options: {
      fetchPolicy: 'network-only'
    },
  })(Customers));
  
  export default CustomerIndexPageWithData
 

