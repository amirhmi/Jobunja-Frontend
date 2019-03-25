import React, { Component } from 'react';
import './main.scss'

export default class Main extends Component<Props, State> {
  render() {
    return (
        <main>     
            {
              this.props.children
            }
        </main>
    );
  }
}

interface State {}
interface Props {}
