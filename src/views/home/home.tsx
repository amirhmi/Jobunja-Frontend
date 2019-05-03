import React, { Component } from 'react';
import axios from 'axios';
import { ErrorHandlerService, WarningHandlerService } from 'src/core/error-handler-service';
import Layout from '../layout/layout';
import './home.scss'
import { Link } from 'react-router-dom';
import { string } from 'prop-types';

export default class Header extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            users: [],
            projects: [],
            deadlines: [],
            page: 1,
            limit: 10
        }
        this.getUsers();
        this.getProjects();
      }

    componentWillMount() {
        setInterval(() => this.updateProjectsTime()
        , 1000);
      }

    getUsers = async () => {
        await axios.get(`http://localhost:8080/users`)
         .then( (res: any) => {
           this.setState({
             users: res.data,
           });
         })
         .catch( (err: any) => {
        });
     }

     getProjects = async () => {
        await axios.get('http://localhost:8080/projects/page?page=0&limit=10')
         .then( (res: any) => {
           this.setState({
             projects: res.data,
           });
         })
         .catch( (err: any) => {
            ErrorHandlerService("خطا در برقراری ارتباط با سرور");
        });
     }

    updateProjectsTime = () => {
        let times: IDeadline[] = [];
        for(let i = 0; i < this.state.projects.length; i++) {
            times.push(this.findProjectDeadlineTime(this.state.projects[i]));
        }
        this.setState({
            deadlines: times
        });
    }

    findProjectDeadlineTime = (project: IProject) : IDeadline => {
        let deadline : IDeadline = {isFinished: false, remainTime: ''}
        if(project.deadline < Date.now()) {
            deadline.isFinished = true;
            return deadline;
        }
        var delta = Math.abs(project.deadline - Date.now()) / 1000;
        var days = Math.floor(delta / 86400);
        if(days > 0) {
            deadline.remainTime = toPersianNum(days) + " روز";
            return deadline;
        }
        delta -= days * 86400;
        var hours = Math.floor(delta / 3600) % 24;
        if(hours > 0) {
            deadline.remainTime = toPersianNum(hours) + " ساعت";
            return deadline;
        }
        delta -= hours * 3600;
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        var seconds = delta % 60;
        if(Math.floor(seconds) > 9)
            deadline.remainTime = toPersianNum(minutes) + ":" + toPersianNum(Math.floor(seconds));
        else
            deadline.remainTime = toPersianNum(minutes) + ":0" + toPersianNum(Math.floor(seconds));
        return deadline;
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
    handleSubmitOnProject = async (event: any) => {
        event.preventDefault();
        if(this.state.searchProject == null || this.state.searchProject == undefined || this.state.searchProject == '') {
            ErrorHandlerService("فیلد جستجو خالی می باشد")
            return;
        }
        await axios.get('http://localhost:8080/projects/page?page=0' + '&limit=' + this.state.limit.toString() + '&searchKey=' + this.state.searchProject)
         .then( (res: any) => {
            if(res.data.length == 0) {
                WarningHandlerService("پروژه ای یافت نشد");
            }
            this.setState({
                projects: res.data
            });
            this.setState({
                page: 1,
            });
         })
         .catch( (err: any) => {
            ErrorHandlerService("خطا در برقراری ارتباط با سرور");
        });
        this.setState({
            page: this.state.page + 1
        });
    }
    handleChangeOnProject = (event: any) => {
        this.setState({
            searchProject: event.currentTarget.value
        });
    }

    showUsers = () => {
        if(this.state.users.length > 0) {
            var userElements = this.state.users.map(function(user) {
                return (
                    <div className="row user-row">
                    <div className="col-3 user-img">
                        <img src={user.profile_pic_url} />
                    </div>
                    <div className="col-9 user-inf">
                        <p className="fullname">
                            <Link to={"/user/" + user.id}>{user.first_name} {user.last_name}</Link>
                        </p>
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
            var deadlines = this.getReaminTimes();

            let count =  0;
            var projectElements = this.state.projects.map((project) => {
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
                                    <label>
                                        <Link to={"/project/" + project.id}>
                                            {project.title}
                                        </Link>
                                    </label>
                                </div>
                                <div className="col-4">
                                    {deadlines[count++]}
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

    redirectToProject = (id: string) => {
        <Link to="/project/1"/>
    }

    getReaminTimes = () => {
        return this.state.deadlines.map(function(deadline) {
            if(deadline.isFinished) {
                return(
                    <div className="remain-time finished">
                        مهلت تمام شده
                    </div>
                )
            }
            else {
                return(
                    <div className="remain-time">
                        زمان باقی مانده: {deadline.remainTime}
                    </div>
                )
            }
        });
    }

    loadMore = async () => {
        let searchKey = '';
        if(this.state.searchProject != undefined && this.state.searchProject != null && this.state.searchProject != '')
            searchKey = '&searchKey=' + this.state.searchProject;
        await axios.get('http://localhost:8080/projects/page?page=' + this.state.page.toString() + '&limit=' + this.state.limit.toString() + searchKey)
         .then( (res: any) => {
            if(res.data.length == 0) {
                WarningHandlerService("پروژه بیشتری وجود ندارد");
            }
            this.setState({
                projects: this.state.projects.concat(res.data)
            });
         })
         .catch( (err: any) => {
            ErrorHandlerService("خطا در برقراری ارتباط با سرور");
        });
        this.setState({
            page: this.state.page + 1
        });

    }

    onSearchUserChange = async (event: any) => {
        await axios.get(`http://localhost:8080/users?searchKey=` + event.currentTarget.value)
         .then( (res: any) => {
           this.setState({
             users: res.data,
           });
         })
         .catch( (err: any) => {
        });
    }


  render() {
    return (
        <Layout>
            <div className="row colored-row home-page"></div>
            <div className="container content home-page">
                <div className="row home-title">جاب‌اونجا خوب است!</div>
                <div className="row home-paragraph">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در</div>
                {this.searchProject()}
                <div className="row main-content">
                    <div className="col-3 users">
                        <div className="row">
                            <input onChange={this.onSearchUserChange} type="text" placeholder="جستجو نام کاربر" />
                        </div>
                        {this.showUsers()}
                    </div>
                    <div className="col-9 projects">
                        {this.showProjects()}
                    </div>
                </div>
                <button onClick={this.loadMore} type="button" className="load-more">بیشتر</button>
            </div>
        </Layout>
    );
  }
}

function toPersianNum(n: number) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n
      .toString()
      .split('')
      .map(x => farsiDigits[parseInt(x)])
      .join('');
  }

interface State {
    projects: IProject[],
    users: IUser[],
    deadlines: IDeadline[],
    searchProject?: string,
    page: number,
    limit: number,
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
interface IDeadline {
    isFinished: boolean,
    remainTime: string
}
