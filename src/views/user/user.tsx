import React, { Component } from 'react';
import axios from 'axios';
import { ErrorHandlerService, WarningHandlerService, SuccessHandlerService } from 'src/core/error-handler-service';
import Layout from 'src/views/layout/layout'
import MySkill from 'src/views/user/skills/mySkills'
import OthersSkill from 'src/views/user/skills/othersSkills'
import './user.scss';
import OthersSkills from 'src/views/user/skills/othersSkills';

export default class User extends Component<Props, State> {
  constructor (props: Props)
  {
    super(props);
    const { match: { params } } = this.props;
    this.state = {
      userId: params.id,
      user: {
        id: '',
        first_name: '',
        last_name: '',
        job_title: '',
        profile_pic_url: '',
        skills: [],
        bio: '',
      },
      validSkills: [],
      amIEndorser: [],
      loginUserId: '',
      selectedAddableSkill: '--انتخاب مهارت--',
    }
    this.getUser();
    this.getLoginUserId();
    this.getValidSkills();
    this.getAmIEndorser();
  }
  getUser = async () => {
    await axios({
      method: 'get',
      url: `http://localhost:8080/users/` + this.state.userId,
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("jwt")
      },
    })
    .then( (res: any) => {
      this.setState({
        user: res.data,
      });
    })
    .catch( (err: any) => {
      ErrorHandlerService("خطا در اتصال به سرور");
    });
  }
  getValidSkills = async () => {
    await axios({
      method: 'get',
      url: 'http://localhost:8080/skills',
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("jwt")
      },
    }).then( (res: any) => {
      this.setState({
        validSkills: res.data,
      })
    })
    .catch( (err: any) => {
    })
  }
  getAmIEndorser = async () => {
    await axios({
      method: 'get',
      url: 'http://localhost:8080/users/' + this.state.userId + "/amiendorser",
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("jwt")
      },
    }).then( (res: any) => {
      this.setState({
        amIEndorser: res.data,
      })
    })
    .catch( (err: any) => {
    })
  }
  getLoginUserId = async () => {
    await axios({
      method: 'get',
      url: 'http://localhost:8080/users/myid',
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("jwt")
      },
    }).then( (res: any) => {
      this.setState({
        loginUserId: res.data,
      })
    })
    .catch( (err: any) => {
    })
  }
  isMyself = () => { return this.state.userId == this.state.loginUserId}
  handleAddSkill = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = {
      skillName: this.state.selectedAddableSkill
    };
    
    for (var i = 0; i < this.state.user.skills.length; i++)
      if (this.state.user.skills[i].skillname === this.state.selectedAddableSkill)
      {
        ErrorHandlerService("مهارت انتخاب شده در لیست مهارت های شما موجود است.");
        return;
      }

    if (this.state.validSkills.indexOf(this.state.selectedAddableSkill) < 0){
      ErrorHandlerService("مهارت انتخاب شده قابل قبول نمی باشد.");
      return;
    }

    axios({
      method: 'put',
      url: "http://localhost:8080/skills/",
      params: params,
      headers: {
      'content-type': 'multipart/form-data',
      'Authorization': "Bearer " + localStorage.getItem("jwt")
      },
    })
    .then((response) => {
      var newValid = this.state.validSkills
      var removedInd = newValid.indexOf(params.skillName)
      if (removedInd > 0){
        newValid.splice(removedInd, 1)
      }
      this.setState({
        user: response.data,
        validSkills: newValid,
        selectedAddableSkill: "--انتخاب مهارت--"
      })
      this.getValidSkills();
      SuccessHandlerService("مهارت مورد نظر افزوده شد.");
    }) .catch(function (error) {
      ErrorHandlerService("خطا در افزودن مهارت");
    });

  }
  handleChangeAddSkill = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({selectedAddableSkill: event.currentTarget.value});
  }
  handleRemoveSkill = (removedSkillName: string) => {
    const params = {
      skillName: removedSkillName
    };
    
    var alreadyHave = false
    for (var i = 0; i < this.state.user.skills.length; i++)
      if (this.state.user.skills[i].skillname === removedSkillName)
        alreadyHave = true
    if (!alreadyHave)
    {
      ErrorHandlerService("مهارت انتخاب شده در لیست مهارت های شما موجود نمی باشد.")
      return;
    }

    axios({
      method: 'delete',
      url: "http://localhost:8080/skills/",
      params: params,
      headers: {
      'content-type': 'multipart/form-data',
      'Authorization': "Bearer " + localStorage.getItem("jwt")
      },
    })
    .then((response) => {
      this.setState({
        user: response.data,
      })
      SuccessHandlerService("مهارت مورد نظر حذف شد.");
    }) .catch(function (error) {
      ErrorHandlerService("خطا در حذف مهارت");
    });
  }
  handleEndorseSkill = (endorsedSkillName: string, endorsedSkillInd: number) => {
    console.log(this.state.amIEndorser)
    const params = {
      skillName: endorsedSkillName
    };
    
    var alreadyHave = false
    for (var i = 0; i < this.state.user.skills.length; i++)
      if (this.state.user.skills[i].skillname === endorsedSkillName)
        alreadyHave = true
    if (!alreadyHave)
    {
      ErrorHandlerService("مهارت انتخاب شده در لیست مهارت های این کاربر موجود نمی باشد.")
      return;
    }

    if (this.state.amIEndorser[endorsedSkillInd])
    {
      ErrorHandlerService("مهارت انتخاب شده قبلا توسط شما تایید شده است.")
      return;
    }

    axios({
      method: 'put',
      url: "http://localhost:8080/users/" + this.state.userId + "/endorse",
      params: params,
      headers: {
      'content-type': 'multipart/form-data',
      'Authorization': "Bearer " + localStorage.getItem("jwt")
      },
    })
    .then((response) => {
      var newAmIEndorser = this.state.amIEndorser;
      this.state.amIEndorser[endorsedSkillInd] = true;
      this.setState({
        user: response.data,
        amIEndorser: newAmIEndorser,
      })
      SuccessHandlerService("مهارت مورد نظر تایید شد.");
    }) .catch(function (error) {
      ErrorHandlerService("خطا در تایید مهارت");
    });
  }

  showUserInformation= () => {
    return (
      <div className="row">
        <div>
            <div className="profile_pic">
            <img src={this.state.user.profile_pic_url} alt="user_image"/>
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
    if (!this.isMyself())
      return;
    else
      return(
        <div className="row">
          <h4 className="skill-label">مهارت ها:</h4>
          <div className="add-skill-div col-auto">
            <form onSubmit={this.handleAddSkill} className="add-skill-form coll-auto">
              <select className="add-skill-input" name="skill" onChange={this.handleChangeAddSkill} value={this.state.selectedAddableSkill}>
                <option hidden>--انتخاب مهارت--</option>
                {
                  this.state.validSkills.map((item, index) => {
                    return (<option key={index} value={item}>{item}</option>)
                  })
                }
              </select>
              <button type="submit">افزودن مهارت</button>
            </form>
          </div>
        </div>
      )
  }
  showSkills = () => {
    if (this.isMyself())
      return (
        <MySkill skills={this.state.user.skills} onRemoveClicked={this.handleRemoveSkill} />
      );
    else
      return (
        <OthersSkill skills={this.state.user.skills} onEndorseClicked={this.handleEndorseSkill} isEndorsedBefore={this.state.amIEndorser} />
      );
  }

  render() {
    return (
      <Layout>
        <div className="row colored-row user-page"></div>
        <div className="container user-page">
          {this.showUserInformation()}
          {this.showUserBio()}
          {this.showAddSkill()}
          {this.showSkills()}
        </div>
      </Layout>
    );
  }
}

interface Props {
  match: any
}
interface State {
  userId: string,
  user: UserObject,
  validSkills: string[],
  amIEndorser: boolean[],
  loginUserId: string,
  selectedAddableSkill: string,
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
  skillname: string,
  point: number,
}