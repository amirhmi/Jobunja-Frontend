import React, { Component } from 'react';
import axios from 'axios';
import { ErrorHandlerService } from 'src/core/error-handler-service';
import Layout from 'src/views/layout/layout'
import NeededSkill from 'src/views/home/skills/skills'
import projectImg from '../../recourse/pictures/girl-with-books.png'
import './user.scss';

import profileImg from '../../recourse/pictures/other-user-profile.png'
import { SlowBuffer } from 'buffer';

export default class User extends Component<Props, State> {
  constructor (props: Props)
  {
    super(props);
    this.state = {
      userId: "1",
      isMyself: false,
      user: {
        id: '',
        first_name: '',
        last_name: '',
        job_title: '',
        profile_pic_url: '',
        skills: [],
        bio: '',
      },
      validSkills: []
    }
    console.log('hello');
    this.getUser();
    this.getValidSkills();
    if (this.state.userId === "1")
      this.setState ({
        isMyself: true
      })
    else
      this.setState ({
        isMyself: false
      })
  }
  getUser = async () => {
    await axios.get(`http://localhost:8080/users/` + this.state.userId)
    .then( (res: any) => {
      this.setState({
        user: res.data,
      });
    })
    .catch( (err: any) => {
      ErrorHandlerService(err);
    });
  }
  getValidSkills = async () => {
    await axios.get('https://localhost:8080/skills')
    .then( (res: any) => {
      this.setState({
        validSkills: res.data,
      })
    })
    .catch( (err: any) => {
      ErrorHandlerService(err);
    })
  }
  showUserInformation= () => {
    return (
      <div className="row">
        <div>
            <div className="profile_pic">
            <img src={/*this.state.user.profile_pic_url*/profileImg} alt="user_image"/>
            </div>
        </div>
        <div className="user">
            <div className="row name">
                <h2>{this.state.user.first_name + " " + this.state.user.last_name}</h2>
            </div>
            <div className="row username">
                <p>{this.state.user.job_title}</p>
            </div>
            <div className="trapezoid"></div>
            <div className="trapezoid-wide"></div>
        </div>
      </div>
    )
  }
  showUserBio = () => {
    return (
      <div className="row content">
        <div className="col-12">
          <p>{this.state.user.bio}</p>
        </div>
      </div>
    )
  }
  showAddSkill = () => {
    return(
      <div className="row">
        <h4 className="skill-label">مهارت ها:</h4>
        <div className="add-skill-div col-auto">
          <form className="add-skill-form coll-auto">
            <select className="add-skill-input" name="skill">
              <option hidden>--انتخاب مهارت--</option>
              {
                this.state.validSkills.map((item, index) => {
                  return (<option value={item}>{item}</option>)
                })
              }
            </select>
            <button type="submit">افزودن مهارت</button>
          </form>
        </div>
      </div>
    )
  }
  render() {
    return (
      <Layout>
        <div className="container">
          {this.showUserInformation()}
          {this.showUserBio()}
          {this.showAddSkill()}
        </div>
      </Layout>
    );
  }
}

interface Props {
}
interface State {
  userId: string,
  isMyself: boolean,
  user: UserObject
  validSkills: string[]
}
interface UserObject {
  id: string,
  first_name: string,
  last_name: string,
  job_title: string,
  profile_pic_url: string,
  skills: Skill[],
  bio: string,
}
interface Skill {
  name: string,
  point: number,
}