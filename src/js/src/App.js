import { Component } from 'react';
import './App.css';
import { getAllStudents } from './client';

class App extends Component {

  state = {
    students: []
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    getAllStudents()
      .then(res => res.json()
        .then(students => {
          console.log('------' + JSON.stringify(students));
          this.setState({ students })
        }));
  }

  render() {
    const { students } = this.state;
    if (students && students.length) {
      return students.map((student, index) => {
        return <div id={index}>
          <h2>{student.studentId}</h2>
          <h2>{student.firstName}</h2>
          <h2>{student.lastName}</h2>
          <h2>{student.email}</h2>
          <h2>{student.gender}</h2>
        </div >
      });
    }
    return (
      <div> No Student </div >
    );
  }

}

export default App;
