import React, { Component } from 'react';
import { string } from 'prop-types';

//FIXME: on start of a finished project

export default class RemainTime extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            deadline: props.deadline,
            isFinished: true
        }
      }

    componentWillReceiveProps(newProps: Props) {
        this.setState({
            deadline: newProps.deadline,
            isFinished: newProps.isFinished
        });
    }

    render() {
        let time
        if(!this.state.isFinished) {
            time = 
                <div className="row inform-data">
                    <div className="col-1">
                        <i className="flaticon-deadline"></i>
                    </div>
                    <div className="col-11 time-data">
                        <label className="inform-label">زمان باقی‌‌مانده:&nbsp;</label>
                        <p className="text-content">{this.remainTimeText()}</p>
                    </div>
                </div>
        }
        else {
            time =
                <div className="row inform-data danger">
                    <div className="col-1">
                        <i className="flaticon-deadline danger"></i>
                    </div>
                    <div className="col-11 time-data">
                        <label className="inform-label danger">مهلت تمام شده</label>
                    </div>
                </div>
        }
        return (
            time
            
        );
    }

    remainTimeText = () => {
        if(!this.state.isFinished) {
            var delta = Math.abs(this.state.deadline - Date.now()) / 1000;
            var days = Math.floor(delta / 86400);
            delta -= days * 86400;
            var hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;
            var minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;
            var seconds = delta % 60;
            let ret = '';
            if(days > 0) {
                ret += days.toString() + ' ' + 'روز و ';
            }
            if(hours > 0) {
                ret += hours.toString() + ' ' + 'ساعت و ';
            }
            if(minutes > 0) {
                ret += minutes.toString() + ' ' + 'دقیقه و ';
            }
            if(seconds > 0) {
                ret += Math.floor(seconds).toString() + ' ' + 'ثانیه ';
            }
            return (
                ret
            );
        }
        else {
            return '';
        }
    }
}


export const isTimeRemain = (time: number) => {
    return time - Date.now() > 0;
  }

interface State {
    deadline: number,
    isFinished: boolean
}
interface Props {
    deadline: number,
    isFinished: boolean
}
