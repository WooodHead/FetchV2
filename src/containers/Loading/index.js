import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Spin from '../../components/uielements/spin';
// import PageHeader from '../../components/utility/pageHeader';
// import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import ContentHolder from '../../components/utility/contentHolder';
import basicStyle from '../../config/basicStyle';
//import IntlMessages from '../../components/utility/intlMessages';

export default class AntdSpin extends Component {
  state = { loading: false }
  toggle = (value) => {
    this.setState({ loading: value });
  }
	render() {

    const style = {
      textAlign: 'center',
      background: '#f1f3f6',
      padding: '30px 50px'
    };

		const { rowStyle, colStyle, gutter } = basicStyle;
    return(<LayoutWrapper>
      {/* <PageHeader>{<IntlMessages id="feedback.alert.spin" />}</PageHeader> */}
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={24} sm={24} xs={24} style={colStyle}>
          {/* <Box
            title={<IntlMessages id="feedback.alert.spin.background" />}
          > */}
            <ContentHolder>
              <div style={style}>
    			      <Spin size="large"/>
              </div>
    			  </ContentHolder>
          {/* </Box> */}
        </Col>
      </Row>
    </LayoutWrapper>);
	}
}
