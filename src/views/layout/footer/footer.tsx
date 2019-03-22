import React, { Component } from 'react';
import './footer.scss'

export default class Header extends Component<Props, State> {
  render() {
    return (
        <footer>
            <div className="footer">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-auto">
                            <span className="footer-text">© تمامی حقوق این سایت متعلق به جاب اونجا می باشد</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
  }
}

interface State {}
interface Props {}
