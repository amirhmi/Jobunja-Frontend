import React, { Component } from 'react';
import axios from 'axios';
import { ErrorHandlerService, WarningHandlerService, SuccessHandlerService } from 'src/core/error-handler-service';
import '../../recourse/icons/font/flaticon.css'
import Layout from 'src/views/layout/layout'
import RemainTime, { isTimeRemain } from './remain-time/RemainTime'
import NeededSkill from './skills/skills'
import './project.scss';

export default class Project extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    const { match: { params } } = this.props;
    this.state = {
      projectId: params.id,
      project: {
        budget: 0,
        deadline: 0,
        description: '',
        id: '',
        imageUrl: '',
        skills: [],
        title: '',
        winnerId: '',
        winnerName: '',
        alreadyBid: false
      },
      isFinished: true,
      bidAmount: 0,
      loading: true
    }
  }

  async componentDidMount() {
    let data = await this.getProject();
    var isFinished = !isTimeRemain(data.deadline);
    this.setState({
      project: data,
      isFinished: isFinished,
      loading: false
    });
    setInterval(() => this.setState({
        isFinished: !isTimeRemain(this.state.project.deadline)
      }), 1000);
    
  }

  getProject = async () => {
     return await axios.get(`http://localhost:8080/projects/` + this.state.projectId)
      .then( (res: any) => {
        return res.data;
      })
      .catch( (err: any) => {
        ErrorHandlerService("خطا در ارتباط با سرور");
      });
  }

  showWinnerInformation = () => {
    //TODO: winner name being a link to its user page
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
    return winner;
  }

  showProjectInformation = () => {
    return (
        <div className="row information">
            <div className="col-3 project-img">
                <img src={this.state.project.imageUrl} alt="logo" />
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
                {this.showWinnerInformation()}
                <div className="details">
                    <h5>توضیحات</h5>
                    <p className="justify">&nbsp;&nbsp;&nbsp;&nbsp;{this.state.project.description}</p>
                </div>
            </div>
        </div>
    )
  }

  showProjectNeededSkills() {
    return (
    <div className="needed-skills">
      <label>مهارت های لازم:</label>
      <NeededSkill skills={this.state.project.skills} />
    </div>
    );
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value.length);
    console.log(this.state.bidAmount.toString().length);
    if(event.currentTarget.value.length > 0 && 
      event.currentTarget.value.length > this.state.bidAmount.toString().length &&
      !event.currentTarget.value[event.currentTarget.value.length-1].toString().match(/^-{0,1}\d+$/)) {
      WarningHandlerService("پیشنهاد می بایست عدد باشد");
      event.currentTarget.value = this.state.bidAmount.toString();
      return;
    }
    this.setState({bidAmount: parseInt(event.currentTarget.value)});
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!this.state.bidAmount.toString().match(/^-{0,1}\d+$/)) {
      ErrorHandlerService("پیشنهاد می بایست عدد باشد");
      return;
    }

    if(this.state.bidAmount > this.state.project.budget) {
      ErrorHandlerService("مبلغ پیشنهادی از بودجه بیشتر می باشد");
      return;
    }

    const params = {
      bidAmount: this.state.bidAmount
    };

    axios({
      method: 'post',
      url: "http://localhost:8080/projects/" + this.state.projectId + "/bid",
      params: params,
      headers: {
      'content-type': 'multipart/form-data',
      },
    })
    .then((response) => {
        let newProject = this.state.project;
        newProject.alreadyBid = true;
        this.setState({
          project: newProject
        });
        SuccessHandlerService("پیشنهاد شما ثبت شد");
    }) .catch(function (error) {
        ErrorHandlerService("خطا در ثبت پیشنهاد");
    });
  }

  showBidForm() {
    let content;
    if(this.state.project.alreadyBid) {
      content = <div className="row">
                  <div className="col-1 icon success">
                      <i className="flaticon-check-mark"></i>
                  </div>
                  <div className="col-6">
                      <p className="msg success">شما قبلا پیشنهاد خود را ثبت کرده اید</p>
                  </div>
                </div>
    }
    else if(this.state.isFinished) {
      content = (
            <div className="row">
                <div className="col-1 icon danger">
                    <i className="flaticon-danger"></i>
                </div>
                <div className="col-6">
                    <p className="msg danger">مهلت ارسال پیشنهاد برای این پروژه به پایان رسیده است!</p>
                </div>
            </div>
      )
    }
    else {
      content = (
        <form onSubmit={this.handleSubmit}>
          <label>ثبت پیشنهاد</label>
          <div className="set-bid-form row">
              <div className="bid-textarea">
                  <input className="bid-input" type="text" placeholder="پیشنهاد خود را وارد کنید" onChange={this.handleChange} />
                  <span>تومان</span>
              </div>
              <div>
                  <button className="submit-bid" type="submit">ارسال</button>
              </div>
          </div>
        </form>
      )
    }

    return (
      <div className="set-bid">
            {content}
        </div>
    )
  }

  render() {
    return (
      this.state.loading ? <div></div> :
      <Layout>
        <div className="row colored-row project-page"></div>        
        <div className="container content project-page">
          {this.showProjectInformation()}
          {this.showProjectNeededSkills()}
          {this.showBidForm()}
        </div>
      </Layout>
    );
  }
  
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
interface State {
  project: IProject,
  projectId: string,
  isFinished: boolean,
  bidAmount: number,
  loading: boolean
}
interface Skill {
  name: string;
  point: number;
}
interface Props {
  match: any;
}
