import React, { Component } from 'react';

export default class MySkills extends Component<Props, State> {
    constructor(props: Props)
    {
        super(props)
    }
    onRemoveClicked = () => {}
    render() {
        var removeSkill = this.props.onRemoveClicked
        var removableSkillElements = this.props.skills.map(function(skill, index) {
            return (
                <div className="col-auto skill removable" key={index} onClick={()=>{removeSkill(skill.skillname)}}>
                    <span className="col-auto skill-title">{skill.skillname}</span>
                    <span className="col-auto pointer skill-val"><span>{skill.point}</span></span>
                </div>
            )
        });
        return (
            <div className="row skill-row">
                {removableSkillElements}
            </div>
        );
    }
}

interface Props {
    skills: Skill[],
    onRemoveClicked: Function,
}
interface State {}

interface Skill {
    skillname: string,
    point: number
}