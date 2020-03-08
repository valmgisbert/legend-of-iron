import React, {Component} from 'react'
import axios from 'axios';
import {withAuth} from './../lib/Auth'

class EditStudent extends Component {
  state = {
    isLoading: true
  };

  componentDidMount(){
    this.getTheStudentInfo();
  }

  getTheStudentInfo = () => {
    axios.get(`http://localhost:5000/settings/editstudent`, { withCredentials: true})
      .then( (response) => {
        const studentInfo = response.data;
        console.log('studentInfo', studentInfo)
        this.setState({studentInfo, isLoading: false});

        
        console.log('this.state', this.state)
      })
      .catch( (err) => console.log(err));
  }

  handleChange = e => {  
    const {name, value, type} = e.target;
    if (type === 'radio') {
      let selected = document.querySelector('input[name="cohort"]:checked').value;
      value = selected;
    }
    this.setState({[name]: value});
  }

  handleSubmit = e => {
    e.preventDefault();
    const { studentName, cohort } = this.state;
    // const { id } = this.props.user._id; 
                                                
    axios.put(`http://localhost:5000/settings/editstudent`, {
      studentName: studentName, 
      cohort: cohort
    }, { 
      withCredentials: true
    })
    .then( () => {
      
    })
    .catch( error => console.log(error) )
  }

  render() {
    const { isLoading } = this.state;
    // const { cohort } = this.state.studentInfo;
    console.log(this.state);
    
    return (
       !isLoading ?
      
      (<div>
        <form>
        <label>Student Name:</label>
            <input
              type="text"
              name="studentName"
              placeholder={this.state.studentInfo.studentName}
              value={this.state.studentInfo.studentName}
              onChange={this.handleChange}
            />

            <label>Choose your cohort:</label>
            <input
              type="radio"
              name="cohort"
              value="ux/ui"
              // {cohort == 'ux/ui' ? checked : null}
              onChange={this.handleChange} /> UX/UI 
            <input
              type="radio"
              name="cohort"
              value="web"
              // {cohort == 'web' ? checked : null}
              onChange={this.handleChange} /> Web Dev 
            <input
              type="radio"
              name="cohort"
              value="data"
              // {cohort == 'data' ? checked : null}
              onChange={this.handleChange} /> Data 

            <button onClick={this.handleSubmit}>Done</button>
            <button onClick={this.props.history.goBack}> Go Back</button>
          </form>
      </div>)
      : null
        
    )
  }
}

export default withAuth(EditStudent);

//document.querySelector({this.state.studentInfo.cohort}).setAttribute("checked");