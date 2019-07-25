import React, { Fragment, Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default class WelcomeToast extends Component {
  
  notify = () => toast("Welcome!", { autoClose: 2000, position: "top-center" });

  render(){
    return (
      <div>
        <button onClick={this.notify}>Welcome!</button>
        <ToastContainer />
      </div>
    );
  }
}