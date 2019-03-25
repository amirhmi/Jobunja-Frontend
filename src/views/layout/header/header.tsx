import React, { Component } from 'react';
import './header.scss'
import JobunjaLogo from '../../../recourse/logo/logo-v1.png'
import { Link } from 'react-router-dom';

export default class Header extends Component<Props, State> {
  //TODO: correct <a> links
  render() {
    return (
        <header>
            <div className="header">
                <div className="container">
                    <div className="row navbar-header align-items-center">
                        <div className="col-1">
                            <span className="logo_icon">
                                <Link to="/">
                                    <img src={JobunjaLogo} alt="logo" />
                                </Link>
                            </span>
                        </div>
                        <div className="col-2 offset-8 account-link">
                            <span>
                                <a className="profile-link" href="profile.html">حساب کاربری</a>
                            </span>
                        </div>
                        <div className="col-1">
                            <span>
                                <a className="exit-link">خروج</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
  }
}

interface State {}
interface Props {}
