import React, { Component } from 'react';

export default class Skills extends Component<Props, State> {
  render() {

    var skillElements = this.props.skills.map(function(skill) {
        return (
            <div className="col-auto skill">
                <span className="col-auto skill-title">{skill.name}</span>
                <span className="col-auto skill-val"><span>{skill.point}</span></span>
            </div>
        )
    });
    return (
        <div className="row skill-row">
            {skillElements}
        </div>
    );
  }

}

interface Props {
    skills: Skill[]
}
interface State {}

interface Skill {
    name: string,
    point: number
}