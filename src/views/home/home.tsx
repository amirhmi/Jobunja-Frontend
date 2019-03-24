import React, { Component } from 'react';
import Layout from '../layout/layout';
import './home.scss'

export default class Header extends Component<Props, State> {

    handleSubmitOnProject = (event: any) => {

    }

    handleChangeOnProject = (event: any) => {

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

  render() {
    return (
        <Layout>
            <div className="container content">
            <div className="row home-title">جاب‌اونجا خوب است!</div>
            <div className="row home-paragraph">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در</div>
            {this.searchProject()}
            </div>
        </Layout>
    );
  }
}

interface State {}
interface Props {}
