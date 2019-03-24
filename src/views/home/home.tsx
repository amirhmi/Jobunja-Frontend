import React, { Component } from 'react';
import axios from 'axios';
import { ErrorHandlerService } from 'src/core/error-handler-service';
import Layout from '../layout/layout';
import './home.scss'

export default class Header extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            users: []
        }
        this.getUsers();
      }

    getUsers = async () => {
        await axios.get(`http://localhost:8080/users`)
         .then( (res: any) => {
           this.setState({
             users: res.data,
           });
         })
         .catch( (err: any) => {
           ErrorHandlerService(err);
         });
     }

    searchProject = () => {
        return (
            <div className="row project-search">
                <form onSubmit={this.handleSubmitOnProject} className="col-8 offset-2">
                    <div className="search-project-form row">
                        <div className="search-project-input col-10">
                            <input className="bid-input" type="text" placeholder="جستجو در جاب‌اونجا" onChange={this.handleChangeOnProject} />
                        </div>
                        <div className="col-2 submit-search-project">
                            <button className="submit" type="submit">جستجو</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
    handleSubmitOnProject = (event: any) => {}
    handleChangeOnProject = (event: any) => {}

    showUsers = () => {
        if(this.state.users.length > 0) {
            var userElements = this.state.users.map(function(user) {
                return (
                    <div className="row user-row">
                    <div className="col-3 user-img">
                        <img src={user.profile_pic_url} />
                    </div>
                    <div className="col-9 user-inf">
                        <p className="fullname">{user.first_name} {user.last_name}</p>
                        <p className="job-title">{user.job_title}</p>
                    </div>
                </div>
                )
            });
            return (
                userElements
            );
        }
        return '';
    }


  render() {
    return (
        <Layout>
            <div className="container content">
            <div className="row home-title">جاب‌اونجا خوب است!</div>
            <div className="row home-paragraph">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در</div>
            {this.searchProject()}
            <div className="row main-content">
                <div className="col-3 users">
                    <div className="row">
                        <input type="text" placeholder="جستجو نام کاربر" />
                    </div>
                    {this.showUsers()}
                </div>
                <div className="col-9 projects">

                </div>
            </div>
            </div>
        </Layout>
    );
  }
}

interface State {
    users: IUser[]
}
interface Props {}


interface IUser {
    id: string,
    first_name: string,
    last_name: string,
    job_title: string,
    profile_pic_url: string,
    skills: Skill[],
    bio: string,
}
interface Skill {
    name: string;
    point: number;
  }
