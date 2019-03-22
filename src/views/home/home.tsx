import React, { Component } from 'react';
import axios from 'axios';
import './home.scss';
import Header from 'src/views/layout/header/header'
import Footer from 'src/views/layout/footer/footer'
import Main from 'src/views/layout/main/main'


export default class Home extends Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = {
      projectId: "20955d46-0aac-4a6a-b546-d1581026663f",
    }
  }

  componentDidMount() {
    this.getProject();
  }

  getProject = () => {
    axios.get(`http://localhost:8080/projects/` + this.state.projectId)
      .then( (res: any) => {
        this.setState({
          project: res.data
        });
      });
  }

  render() {
    return (
      <body>
        <Header />
        <Main />
        <Footer />
      </body>
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
  project?: Project,
  projectId: string
}
interface Skill {
  name: string;
  point: number;
}
interface Props {}
