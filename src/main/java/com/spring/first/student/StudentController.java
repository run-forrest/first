package com.spring.first.student;

import com.spring.first.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("students")
public class StudentController {

    private final StudentService studentService;

    @Autowired(required = false)
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudent() {
        throw  new ApiRequestException("Oops cannot get all student");
//        return studentService.getAllStudents();
    }

    @PostMapping
    public void addNewStudent(@RequestBody @Validated Student student) {
        studentService.addNewStudent(null, student);
    }
}
