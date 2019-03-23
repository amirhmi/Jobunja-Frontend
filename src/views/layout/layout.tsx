import React, { Component } from 'react';
import Header from './header/header'
import Footer from './footer/footer'
import Main from './main/main'
import './layout.scss'

export default class Layout extends Component<Props, State> {
  render() {
    return (
      <body>
        <Header />
        <Main>
          {this.props.children}
        </Main>
        <Footer />
      </body>
    );
  }
}

interface State {}
interface Props {}