import React, { Fragment, Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class WelcomeToast extends Component {
  notify = () => {
    if (this.props.newUser){
      toast('Welcome! A new user account has been created for you.', { autoClose: 2000, position: "top-center" });
    } else {
      toast('Welcome back!', {autoClose: 2000, position: "top-center"});
    }
  }

  render(){
    return (
      <Fragment>
        {this.notify()}
        <ToastContainer />
      </Fragment>
    );
  }
}