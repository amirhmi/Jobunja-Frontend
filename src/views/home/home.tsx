import React, { Component } from 'react';
import axios from 'axios';
import { ErrorHandlerService } from 'src/core/error-handler-service';
import Layout from '../layout/layout';
import './home.scss'

//TODO: user and project links

export default class Header extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            users: [],
            projects: []
        }
        this.getUsers();
        this.getProjects();
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

     getProjects = async () => {
        await axios.get(`http://localhost:8080/projects`)
         .then( (res: any) => {
           this.setState({
             projects: res.data,
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
    handleSubmitOnProject = (event: any) => {
        event.preventDefault();
    }
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

    showProjects = () => {
        if(this.state.projects.length > 0) {
            var projectElements = this.state.projects.map(function(project) {
                let skillElements = project.skills.map(function(skill) {
                    return (
                        <div className="project-skill">
                            {skill.name}
                        </div>
                    );
                });
                return (
                    <div className="row project-item">
                        <div className="col-2 project-img">
                            <img src={project.imageUrl} />
                        </div>
                        <div className="col-10 project-inf">
                            <div className="row">
                                <div className="col-8 title">
                                    {project.title}
                                </div>
                                <div className="col-4">
                                    <div className="remain-time">
                                        زمان باقی‌مانده: ۱۱:۲۴
                                    </div>
                                </div>
                            </div>
                            <div className="row description">
                                {project.description}
                            </div>
                            <div className="row budget">
                                بودجه: {project.budget} تومان
                            </div>
                            <div className="row skills">
                                <label>
                                    مهارت‌ها:
                                </label>
                                {skillElements}
                            </div>
                        </div>
                    </div>
                )
            });
        return (
            projectElements
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
                        {this.showProjects()}
                    </div>
                </div>
            </div>
        </Layout>
    );
  }
}

interface State {
    projects: IProject[],
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
interface IProject {
    budget: number;
    deadline: number;
    description: string;
    id: string
    imageUrl: string;
    skills: Skill[];
    title: string;
    winnerId: string;
    winnerName: string;
    alreadyBid: boolean;
  }
interface Skill {
    name: string;
    point: number;
}
