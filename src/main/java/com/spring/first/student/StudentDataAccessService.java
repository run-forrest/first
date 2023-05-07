package com.spring.first.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Repository
public class StudentDataAccessService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudentDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public List<Student> selectAllStudents() {
        return getStudents();
    }

    private List<Student> getStudents() {
        String sql = "" + "SELECT " + "student_id," + "first_name," + "last_name," + "email," + "gender " + "FROM student";
        return jdbcTemplate.query(sql, (resultSet, i) -> {
            String studentIdStr = resultSet.getString("student_id");
            UUID studentID = UUID.fromString(studentIdStr);
            String firstName = resultSet.getString("first_name");
            String lastName = resultSet.getString("last_name");
            String email = resultSet.getString("email");
            String genderStr = resultSet.getString("gender").toUpperCase();
            Student.Gender gender = Student.Gender.valueOf(genderStr);
            return new Student(studentID, firstName, lastName, email, gender);
        });
    }

    public int insertStudent(UUID studentId, Student student) {
        String sql = "" + "INSERT INTO student (student_id, first_name, last_name, email, gender) " + "VALUES (?,?,?,?,?)";
        return jdbcTemplate.update(sql, studentId, student.getFirstName(), student.getLastName(), student.getEmail(), student.getGender().name().toUpperCase());
    }
}
