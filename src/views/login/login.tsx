import React, { Component } from 'react';
import '../../recourse/icons/font2/flaticon.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './login.scss'
import JobunjaLogo from '../../recourse/logo/logo-v1.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SuccessHandlerService, ErrorHandlerService } from 'src/core/error-handler-service';

export default class Login extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            password: '',
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
            <NotificationContainer/>
        </div>
    )
  }

}

interface Props {}
interface State {
    username: string,
    password: string
}