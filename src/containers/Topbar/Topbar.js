import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { toggleCollapsed } from '../../redux/app/reducer';
import {
  // TopbarMail,
  // TopbarNotification,
  // TopbarMessage,
  // TopbarAddtoCart,
  TopbarSearch,
  TopbarUser,
  
} from '../../components/topbar';

const { Header } = Layout;

class Topbar extends Component {
  render() {
    const { toggleCollapsed, customizedTheme } = this.props; // url,
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    // const padLeft = collapsed ? "89px" : "265px";
    const styling = {
      background: customizedTheme.backgroundColor,
      position: 'fixed',
      width: '100%',
      height: 70,
      // padding: "0 31px 0 0",
      // paddingLeft: padLeft,
    };
    return (
      <Header
        style={styling}
        className={
          collapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className="isoLeft">
          <button
            className={
              collapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
            }
            style={{ color: customizedTheme.textColor }}
            onClick={toggleCollapsed}
          />
        </div>

        <ul className="isoRight">
          <li className="isoSearch">
            <TopbarSearch />
          </li>

          <li
            onClick={() => this.setState({ selectedItem: 'mail' })}
            className="isoMail"
          >
            {/* <TopbarMail url={url} /> */}
            {/* <Badge status="processing" /> */}
          </li>

          {/* <li
            onClick={() => this.setState({ selectedItem: 'notification' })}
            className="isoNotify"
          >
            <TopbarNotification />
          </li>

          <li
            onClick={() => this.setState({ selectedItem: 'message' })}
            className="isoMsg"
          >
            <TopbarMessage />
          </li>
          <li
            onClick={() => this.setState({ selectedItem: 'addToCart' })}
            className="isoCart"
          >
            <TopbarAddtoCart url={url} />
          </li> */}

          <li
            onClick={() => this.setState({ selectedItem: 'user' })}
            className="isoUser"
          >
            <TopbarUser />
          </li>
        </ul>
      </Header>
    );
  }
}

export default connect(
  state => ({
    ...state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().topbarTheme,
  }),
  { toggleCollapsed }
)(Topbar);
