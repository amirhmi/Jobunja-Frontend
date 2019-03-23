import React, { Component } from 'react';
import axios from 'axios';
import { ErrorHandlerService } from 'src/core/error-handler-service';
import '../../recourse/icons/font/flaticon.css'
import Layout from 'src/views/layout/layout'
import RemainTime, { isTimeRemain } from './remain-time/RemainTime'
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
        winnerId: '',
        winnerName: ''
      },
      isFinished: true
    }
    this.getProject();
  }

  componentWillMount() {
    setInterval(() => this.setState({
        isFinished: !isTimeRemain(this.state.project.deadline)
      }), 1000);
  }

  getProject = async () => {
     await axios.get(`http://localhost:8080/projects/` + this.state.projectId)
      .then( (res: any) => {
        this.setState({
          project: res.data,
        });
        //TODO: remove this line
      })
      .catch( (err: any) => {
        ErrorHandlerService(err);
      });
  }

  showProjectInformation = () => {
    let winner; 
    if(this.state.isFinished && this.state.project.winnerName != '') {
      winner =  (<div className="row success inform-data">
                  <div className="col-1">
                      <i className="flaticon-check-mark"></i>
                  </div>
                  <div className="col-11 budget-text">
                      <label className="inform-label">برنده:&nbsp;</label>
                      <p className="text-content">{this.state.project.winnerName}</p>
                  </div>
                </div>
              );
            }
    
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
                <RemainTime deadline={this.state.project.deadline} isFinished={this.state.isFinished} />
                <div className="row inform-data budget">
                    <div className="col-1">
                        <i className="flaticon-money-bag"></i>
                    </div>
                    <div className="col-11 budget-text">
                        <label className="inform-label">بودجه:&nbsp;</label>
                        <p className="text-content">{this.state.project.budget} تومان</p>
                    </div>
                </div>
                {winner}
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
  winnerId: string;
  winnerName: string;
}
interface State {
  project: Project,
  projectId: string,
  isFinished: boolean
}
interface Skill {
  name: string;
  point: number;
}
interface Props {}
