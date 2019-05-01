import React, { Component } from 'react';
import './header.scss'
import JobunjaLogo from '../../../recourse/logo/logo-v1.png'
import { Link } from 'react-router-dom';

export default class Header extends Component<Props, State> {
  render() {
      let logo, profile, exit;
    if(this.props.disable == null || this.props.disable == false) {
        profile = (
            <div className="col-2 offset-8 account-link">
                <span>
                    <a className="profile-link" href="/user/1">حساب کاربری</a>
                </span>
            </div>
        );
        exit = (
            <div className="col-1">
                <span>
                    <a className="exit-link">خروج</a>
                </span>
            </div>
        );
        logo = (
            <a href="/">
                <img src={JobunjaLogo} alt="logo" />
            </a>
        );
    }
    else {
        profile = '';
        exit='';
        logo =  <img src={JobunjaLogo} alt="logo" />

    }
    return (
        <header>
            <div className="header">
                <div className="container">
                    <div className="row navbar-header align-items-center">
                        <div className="col-1">
                            <span className="logo_icon">
                                {logo}
                            </span>
                        </div>
                        {profile}
                        {exit}
                    </div>
                </div>
            </div>
        </header>
    );
  }
}

interface State {}
interface Props {
    disable?: boolean
}
