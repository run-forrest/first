import { Component } from 'react';
import './App.css';
import { getAllStudents } from './client';
import { Table, Avatar, Spin, } from 'antd';
import { LoadingOutlined, } from '@ant-design/icons';
import Container from './Container';


const getIndicatorIcon = () => <LoadingOutlined />


class App extends Component {

  state = {
    students: [],
    isFetch: false
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    this.setState({
      isFetch: true
    });
    getAllStudents()
      .then(res => res.json()
        .then(students => {
          console.log('------' + JSON.stringify(students));
          this.setState({
            students,
            isFetch: false
          })
        }));
  }

  render() {
    const { students, isFetch } = this.state;

    if (isFetch) {
      return <Container>
        <Spin indicator={getIndicatorIcon()} />
      </Container>
    }

    if (students && students.length) {
      const columns = [
        {
          title: "", key: "avatar", render: (text, student) =>
            <Avatar size='large'>
              {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
            </Avatar>
        },
        { title: "StudentId", dataIndex: "studentId", key: "studentId", },
        { title: "FirstName", dataIndex: "firstName", key: "firstName", },
        { title: "LastName", dataIndex: "lastName", key: "lastName", },
        { title: "Email", dataIndex: "email", key: "email", },
        { title: "Gender", dataIndex: "gender", key: "gender", },
      ];

      return <Container><Table dataSource={students} columns={columns} pagination={false} rowKey='studentId' /></Container>;

      // return students.map((student, index) => {
      //   return <div id={index}>
      //     <h2>{student.studentId}</h2>
      //     <h2>{student.firstName}</h2>
      //     <h2>{student.lastName}</h2>
      //     <h2>{student.email}</h2>
      //     <h2>{student.gender}</h2>
      //   </div >
      // });
    }
    return (
      <div> No Student </div >
    );
  }

}

export default App;
