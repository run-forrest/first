import { Component } from 'react';
import Footer from './Footer';
import './App.css';

import { getAllStudents } from './client';
import AddStudentForm from './forms/AddStudentForm';
import { errorNotification } from './Notification';
import { Table, Avatar, Spin, Modal, Empty, } from 'antd';
import { LoadingOutlined, } from '@ant-design/icons';
import Container from './Container';


const getIndicatorIcon = () => <LoadingOutlined />


class App extends Component {

  state = {
    students: [],
    isFetch: false,
    isAddStudentModalVisisble: false
  }

  componentDidMount() {
    this.fetchStudents();
  }

  openAddStudentModal = () => this.setState({ isAddStudentModalVisisble: true })
  closeAddStudentModal = () => this.setState({ isAddStudentModalVisisble: false })

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
        }))
        .catch(error => {
          const message = error.error.message;
          const description= error.error.error;
          errorNotification(message, description);
          this.setState({
            isFetch: false
          });
          console.log(error);
        });
  }

  render() {
    const { students, isFetch, isAddStudentModalVisisble } = this.state;

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

      return <Container>
        <Table style={{ marginBottom: '100px' }} dataSource={students} columns={columns} pagination={false} rowKey='studentId' />
        <Modal title='Add new student'
          open={isAddStudentModalVisisble}
          onOk={this.closeAddStudentModal}
          onCancel={this.closeAddStudentModal}
          width={1000}>
          <AddStudentForm
            onSuccess={() => {
              console.log('----close modal');
              this.closeAddStudentModal();
              this.fetchStudents();

            }}
          />
        </Modal>
        <Footer
          handleAddStudentClickEvent={this.openAddStudentModal}
          numberOfStudents={students.length}></Footer>
      </Container>;

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
    return <Empty description={<h1>No Student</h1>} />;
  }

}

export default App;
