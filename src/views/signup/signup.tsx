import React, { Component } from 'react';
import Layout from '../layout/layout';
import './signup.scss'
import { Link } from 'react-router-dom';

export default class Signup extends Component<Props, State> {
  render() {
    return (
        <Layout>
            <div className="row colored-row signup-page"></div>        
            <div className="container content signup-page">
                <h3>ثبت نام</h3>
                <div className="form">
                    <div className="form-content">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="نام" value=""/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="نام خانوادگی" value=""/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="نام کاربری" value=""/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="رمز عبور" value=""/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="تکرار رمز عبور" value=""/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="عنوان شغلی" value=""/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="لینک عکس پروفایل" value=""/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="بیو" value=""/>
                                </div>
                                <div className="form-group submit-btn">
                                    <button type="button" className="btn">ثبت</button>
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
                </div>
            </div>
        </Layout>
    );
  }
}

interface State {}
interface Props {}
