import React, {Component} from 'react'
import axios from 'axios';
import {withAuth} from './../lib/Auth'

class EditStudent extends Component {
  state = {
    studentName: "",
    cohort: "",
    isLoading: true
  };

  componentDidMount(){
    this.getTheStudentInfo();
  }
  
  getTheStudentInfo = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/settings/editstudent`, { withCredentials: true})
    .then( (response) => {
      const studentInfo = response.data;
      console.log('studentInfo', studentInfo)
      this.setState({studentName: studentInfo.studentName, cohort: studentInfo.cohort, isLoading: false});

      console.log('this.state in get', this.state)
      })  
      .catch( (err) => console.log(err));
  }

  handleChange = e => {  
    let {name, value, type} = e.target;
    if (type === 'radio') {
      let selected = document.querySelector('input[name="cohort"]:checked').value;
      value = selected;
    }
    this.setState({[name]: value});
    console.log('this.state in change', this.state)
  }

  handleSubmit = e => {
    e.preventDefault();
    const { studentName, cohort } = this.state;
    // const { id } = this.props.user._id; 
                                                
    axios.put(`${process.env.REACT_APP_API_URL}/settings/editstudent`, {
      studentName, cohort}, { 
      withCredentials: true
    })
    .then( () => {
      console.log('this.state in submit', this.state)
    })
    .catch( error => console.log(error) )
  }

  render() {
    const { isLoading } = this.state;
    console.log('this.state in render', this.state);
    
    return (
       !isLoading ?
      
      (<div>
        <form onSubmit={this.handleSubmit}>
        <label>Student Name:</label>
            <input
              type="text"
              name="studentName"
              placeholder={this.state.studentName}
              value={this.state.studentName}
              onChange={this.handleChange}
            />

            <label>Choose your cohort:</label>
            <input
              type="radio"
              name="cohort"
              value="ux/ui"
              checked={this.state.cohort === "ux/ui"}
              onChange={this.handleChange} /> UX/UI 
            <input
              type="radio"
              name="cohort"
              value="web"
              checked={this.state.cohort === "web"}
              onChange={this.handleChange} /> Web Dev 
            <input
              type="radio"
              name="cohort"
              value="data"
              checked={this.state.cohort === "data"}
              onChange={this.handleChange} /> Data 

            <button type="submit">Done</button>
            <button onClick={this.props.history.goBack}> Go Back</button>
          </form>
      </div>)
      : null
        
    )
  }
}

export default withAuth(EditStudent);