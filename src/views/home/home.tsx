import React, { Component } from 'react';
import axios from 'axios';
import { ErrorHandlerService } from 'src/core/error-handler-service';
import '../../recourse/icons/font/flaticon.css'
import Layout from 'src/views/layout/layout'
import projectImg from '../../recourse/pictures/girl-with-books.png'
import './home.scss';

export default class Home extends Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = {
      projectId: "a1f824a0-d650-483a-bbd1-91c4145e3f9a",
      project: {
        budget: 0,
        deadline: 0,
        description: '',
        id: '',
        imageUrl: '',
        skills: [],
        title: '',
        winner: ''
      }
    }
  }

  componentWillMount() {
    this.getProject();
  }

  componentDidMount() {

  }

  getProject = () => {
    axios.get(`http://localhost:8080/projects/` + this.state.projectId)
      .then( (res: any) => {
        this.setState({
          project: res.data
        });
      })
      .catch( (err: any) => {
        ErrorHandlerService(err);
      });
  }

  showProjectInformation = () => {
    return (
      <div className="container content">
        <div className="row information">
            <div className="col-3 project-img">
                <img src={projectImg} alt="logo" />
            </div>
            <div className="col-8 data">
                <div className="row project-name">
                    <h2>{this.state.project.title}</h2>
                </div>
                <div className="row inform-data">
                    <div className="col-1">
                        <i className="flaticon-deadline"></i>
                    </div>
                    <div className="col-11 time-data">
                        <label className="inform-label">زمان باقی‌‌مانده:&nbsp;</label>
                        <p className="text-content">{this.state.project.deadline}</p>
                    </div>
                </div>
                <div className="row inform-data budget">
                    <div className="col-1">
                        <i className="flaticon-money-bag"></i>
                    </div>
                    <div className="col-11 budget-text">
                        <label className="inform-label">بودجه:&nbsp;</label>
                        <p className="text-content">{this.state.project.budget} تومان</p>
                    </div>
                </div>
                <div className="details">
                    <h5>توضیحات</h5>
                    <p className="justify">&nbsp;&nbsp;&nbsp;&nbsp;{this.state.project.description}</p>
                </div>
            </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Layout>
          {this.showProjectInformation()}
      </Layout>
    );
  }
  
}

interface Project {
  budget: number;
  deadline: number;
  description: string;
  id: string
  imageUrl: string;
  skills: Skill[];
  title: string;
  winner: string;
}
interface State {
  project: Project,
  projectId: string
}
interface Skill {
  name: string;
  point: number;
}
interface Props {}
