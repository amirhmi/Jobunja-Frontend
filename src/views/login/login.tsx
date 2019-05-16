import React, { Component } from 'react';
import '../../recourse/icons/font2/flaticon.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './login.scss'
import JobunjaLogo from '../../recourse/logo/logo-v1.png'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { SuccessHandlerService, ErrorHandlerService } from 'src/core/error-handler-service';

export default class Login extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            fireRedirect: false
        }
        if(localStorage.getItem("jwt") != null) {
            window.location.href = '/';            
        }
    }

    handleUserName= (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            username: event.currentTarget.value
        });
    }

    handlePassword= (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            password: event.currentTarget.value
        });
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(this.state.username == '') {
            NotificationManager.error("نام کاربری خالی می باشد");
            return;
        }
        else if(this.state.password == '') {
            NotificationManager.error("رمز عبور خالی می باشد");
            return;
        }

        const params = {
            userName: this.state.username,
            password: this.state.password,
          };
      
          axios({
            method: 'post',
            url: "http://localhost:8080/login",
            params: params,
            headers: {
            'content-type': 'multipart/form-data',
            },
          })
          .then((response) => {
            localStorage.setItem("jwt", response.data);
            localStorage.setItem("userId", parseJwt(localStorage.getItem("jwt")).jti);
            this.setState({
                fireRedirect: true
            })
          }) .catch(function (error) {
            ErrorHandlerService("نام کاربری یا رمز عبور اشتباه است");      
          });
    } 
  render() {
    return (
        <div className="main login-page">
            <div className="container">
                <div>
                    <div className="middle">
                        <div id="login">
                        <form onSubmit={this.handleSubmit}>
                            <fieldset className="clearfix">
                                <p ><span className="icon flaticon-user"/><input type="text"  placeholder="نام کاربری" onChange={this.handleUserName} /></p>
                                <p><span className="icon flaticon-password"/><input type="password"  placeholder="رمز عبور" onChange={this.handlePassword} /></p>
                                <div>
                                    <span className="login-submit"><input type="submit" value="ورود" /></span>
                                    <span className="login-password"><Link to="/signup"className="small-text">ثبت نام</Link></span>
                                </div>
                            </fieldset>
                            <div className="clearfix"></div>
                        </form>
                        <div className="clearfix"></div>
                        </div>
                        <div className="logo">
                        <img className="logo-img" src={JobunjaLogo} />
                        <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
            {this.state.fireRedirect && (
                     <Redirect to={'/'}/>
            )}
            <NotificationContainer/>
        </div>
    )
  }

}

function parseJwt (token: any) {
    var base64Url = token.split('.')[1];
    var base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
};

interface Props {}
interface State {
    username: string,
    password: string,
    fireRedirect: boolean
}