import React, { Component } from 'react';
import { ErrorHandlerService } from 'src/core/error-handler-service';
import User from 'src/views/user/user';
import './home.scss';
import Header from 'src/views/layout/header/header'
import Footer from 'src/views/layout/footer/footer'
import Main from 'src/views/layout/main/main'


export default class Home extends Component<Props, State> {
  getUsers() {
    fetch(new Request('http://localhost:8001/posts/1', { method: 'GET' }))
      .then(response => {
        if (!response.ok) ErrorHandlerService(response);
        return response.json();
      })
      .then(response => {
        console.log('TCL: Home -> getUsers -> response', response);
      })
      .catch(error => {
        console.log('TCL: Home -> getUsers -> error', error);
        ErrorHandlerService(error);
      });
  }
  handlePnClick: (inputValue: string) => void = inputValue => {
    console.log('TCL: Home -> handlePnClick: -> inputValue', inputValue);
  };

  addSkill: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = event => {
    this.setState({ skills: [...this.state.skills, { name: 'js', endorse: 333 }] });
  };
  removeSkill: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = event => {
    this.setState({ skills: this.state.skills.filter(s => s.name === 'js') });
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      skills: [{ name: 'HTML', endorse: 4 }, { name: 'CSS', endorse: 5 }]
    };
  }
  componentDidMount = () => {
    this.getUsers();
  };
  componentWillUnmount = () => {};

  render() {
    const { skills } = this.state;

    const skillsComp = skills.map((s, i) => (
      <div key={i}>
        <span>{s.name}</span>
        <span>{s.endorse}</span>
      </div>
    ));

    return (
      <body>
        <Header />
        <Main />
        <Footer />
      </body>
    );
  }
  // onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  //   if (event.ctrlKey) {
  //     this.setState((state, props) => ({ title: `${state.title} - new title` }));
  //   }
  // }
}

interface State {
  skills: Skill[];
}
interface Skill {
  name: string;
  endorse: number;
}
interface Props {}
