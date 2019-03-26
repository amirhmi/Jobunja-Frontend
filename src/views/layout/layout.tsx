import React, { Component } from 'react';
import {NotificationContainer} from 'react-notifications';
import Header from './header/header'
import Footer from './footer/footer'
import Main from './main/main'
import './layout.scss'

export default class Layout extends Component<Props, State> {
  render() {
    return (
      <div>
        <Header disable={this.props.disableHeader }/>
        <Main>
          {this.props.children}
        </Main>
        <Footer />
        <NotificationContainer/>
      </div>
    );
  }
}

interface State {}
interface Props {
  disableHeader?: boolean
}
