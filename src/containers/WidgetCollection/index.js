import React from 'react';
import { Row, Col } from 'antd';
import basicStyle from '../../config/basicStyle';
import IsoWidgetsWrapper from './widgets-wrapper';
import SingleProgressWidget from './progress/progress-single';
import ReportsWidget from './report/report-widget';
import VCardWidget from './vCard/vCard-widget';
import userpic from '../../image/user1.png';
import IntlMessages from '../../components/utility/intlMessages';


export default class IsoWidgets extends React.Component {
  render() {
    const { rowStyle, colStyle } = basicStyle;
    const wisgetPageStyle = {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'flex-start',
      padding: '15px',
      overflow: 'hidden',
    };

    return (
      <div style={wisgetPageStyle}>
        <Row style={rowStyle} gutter={0} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Report Widget */}
              <ReportsWidget
                label={<IntlMessages id="widget.reportswidget.label" />}
                details={<IntlMessages id="widget.reportswidget.details" />}
              >
                <SingleProgressWidget
                  label={
                    <IntlMessages id="widget.singleprogresswidget1.label" />
                  }
                  percent={70}
                  barHeight={7}
                  status="active"
                  info={true} // Boolean: true, false
                />
              </ReportsWidget>
            </IsoWidgetsWrapper>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={0} justify="start">
   
          <Col md={8} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* VCard Widget */}
              <VCardWidget
                style={{ height: '450px' }}
                src={userpic}
                alt="Jhon"
                name={<IntlMessages id="widget.vcardwidget.name" />}
                title={<IntlMessages id="widget.vcardwidget.title" />}
                description={
                  <IntlMessages id="widget.vcardwidget.description" />
                }
              >
              </VCardWidget>
            </IsoWidgetsWrapper>
          </Col>
        </Row>
      </div>
    );
  }
}
