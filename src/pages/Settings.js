import React, { Component } from 'react';
import EditStudent from '../components/EditStudent';
import { Link } from "react-router-dom";
import {withAuth} from './../lib/Auth';

class Settings extends Component {
  render() {
    return (
      <div>
        <h1>Settings</h1>
        <br />
        <br />
        <button>
          <Link to={'/settings/editstudent'}>
            Edit Student
          </Link>
        </button>
      </div>
    )
  }
}

export default withAuth(Settings);
