import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
class Header extends React.Component {
  render () {
    const {pathname} = this.props.location;
    if(pathname === '/'){
        return (
            <div className="ui secondary pointing menu">
                <div className="right menu">
                <GoogleAuth />
            </div>
        </div>
        );
    }else{
        return (
            <div className="ui secondary pointing menu">
                <Link to="/" className="item">
                    <i className="angle left icon" />Go To Book List
                </Link>
                <div className="right menu">
                    <GoogleAuth />
                </div>
            </div>
        );
    }
    
  }
}

export default Header;