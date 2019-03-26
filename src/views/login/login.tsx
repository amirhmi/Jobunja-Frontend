import React, { Component } from 'react';
import '../../recourse/icons/font2/flaticon.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './login.scss'
import JobunjaLogo from '../../recourse/logo/logo-v1.png'
import { Link } from 'react-router-dom';

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
        else if(this.state.password.length < 6) {
            NotificationManager.error("رمز عبور اشتباه می باشد");
            return;
        }
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