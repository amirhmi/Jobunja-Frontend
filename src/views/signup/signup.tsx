import React, { Component } from 'react';
import './signup.scss'
import axios from 'axios';
import { ErrorHandlerService, WarningHandlerService, SuccessHandlerService } from 'src/core/error-handler-service';
import Layout from '../layout/layout';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'

export default class Signup extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            confirmpassword: '',
            jobtitle: '',
            imgurl: '',
            bio: '',
            fireRedirect: false
        }
    }

    handleFirstName= (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            firstname: event.currentTarget.value
        });
    }

    handleLastName= (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            lastname: event.currentTarget.value
        });
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

    handleConfirmPassword= (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            confirmpassword: event.currentTarget.value
        });
    }

    handleJobTitle= (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            jobtitle: event.currentTarget.value
        });
    }

    handleImgUrl= (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            imgurl: event.currentTarget.value
        });
    }

    handleBio= (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            bio: event.currentTarget.value
        });
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(this.state.firstname == '') {
            ErrorHandlerService("نام خالی می باشد");
            return;
        }
        else if(this.state.lastname == '') {
            ErrorHandlerService("نام خانوادگی خالی می باشد");
            return;
        }
        else if(this.state.username == '') {
            ErrorHandlerService("نام کاربری خالی می باشد");
            return;
        }
        else if(this.state.password.length < 6) {
            ErrorHandlerService("رمز عبور کمتر از ۶ حرف می باشد");
            return;
        }
        else if(this.state.confirmpassword != this.state.password) {
            ErrorHandlerService("رمز عبور و تایید رمز برابر نمی باشد");
            return;
        }
        else if(this.state.jobtitle == '') {
            ErrorHandlerService("عنوان شغلی خالی می باشد");
            return;
        }
        else if(this.state.imgurl == '') {
            ErrorHandlerService("لینک عکس خالی می باشد");
            return;
        }

        const params = {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            userName: this.state.username,
            password: this.state.password,
            jobTitle: this.state.jobtitle,
            imgUrl: this.state.imgurl,
            bio: this.state.bio,
          };
      
          axios({
            method: 'post',
            url: "http://localhost:8080/signup",
            params: params,
            headers: {
            'content-type': 'multipart/form-data',
            },
          })
          .then((response) => {
            SuccessHandlerService("ثبت نام با موفقیت انجام شد");
            this.setState({ fireRedirect: true })
          }) .catch(function (error) {
            ErrorHandlerService("خطا در ثبت نام");      
          });
    } 

  render() {
      
    return (
        <Layout disableHeader={true}>
            <div className="row colored-row signup-page"></div>        
            <div className="container content signup-page">
                <h3>ثبت نام</h3>
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="form-content">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="نام" onChange={this.handleFirstName}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="نام خانوادگی" onChange={this.handleLastName}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="نام کاربری" onChange={this.handleUserName}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="رمز عبور" onChange={this.handlePassword}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="تکرار رمز عبور" onChange={this.handleConfirmPassword}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="عنوان شغلی" onChange={this.handleJobTitle}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="لینک عکس پروفایل" onChange={this.handleImgUrl}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="بیو" onChange={this.handleBio}/>
                                </div>
                                <div className="form-group submit-btn">
                                    <button type="submit" className="btn">ثبت</button>
                                </div>
                                <div className="already-login">
                                    <p>آیا قبلا ثبت نام کرده اید؟&nbsp;</p>
                                    <Link to="/login">وارد شوید</Link>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='slider'>
                                    <div className='slide1'></div>
                                    <div className='slide2'></div>
                                    <div className='slide3'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                {this.state.fireRedirect && (
                     <Redirect to={'/login'}/>
                )}
            </div>
        </Layout>
    );
  }
}

interface State {
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    confirmpassword: string,
    jobtitle: string,
    imgurl: string,
    bio: string,
    fireRedirect: boolean
}
interface Props {}
