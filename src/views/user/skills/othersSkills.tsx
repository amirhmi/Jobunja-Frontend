import React, { Component } from 'react';

export default class OthersSkills extends Component<Props, State> {
    constructor(props: Props)
    {
        super(props)
    }
    onRemoveClicked = () => {}
    render() {
        var endorseSkill = this.props.onEndorseClicked
        var endorsedBefor = this.props.isEndorsedBefore
        var endorsableSkillElements = this.props.skills.map(function(skill, index) {
            if (endorsedBefor[index])
                return (
                    <div className="col-auto skill endorsed" key={index} onClick={()=>{endorseSkill(skill.skillname, index)}}>
                        <span className="col-auto skill-title">{skill.skillname}</span>
                        <span className="col-auto skill-val"><span>{skill.point}</span></span>
                    </div>
                )
            else
                return (
                    <div className="col-auto skill endorsable" key={index} onClick={()=>{endorseSkill(skill.skillname, index)}}>
                        <span className="col-auto skill-title">{skill.skillname}</span>
                        <span className="col-auto pointer skill-val"><span>{skill.point}</span></span>
                    </div>
                )
        });
        return (
            <div className="row skill-row">
                {endorsableSkillElements}
            </div>
        );
    }
}

interface Props {
    skills: Skill[],
    isEndorsedBefore: boolean[],
    onEndorseClicked: Function,
}
interface State {}

interface Skill {
    skillname: string,
    point: number
}