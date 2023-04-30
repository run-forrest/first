package com.spring.first.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("students")
public class StudentController {
    @GetMapping
    public List<Student> getAllStudent() {
        return Arrays.asList(new Student(UUID.randomUUID(), "James", "Harden", "rocket@gmail.com,", Student.Gender.MALE),
                new Student(UUID.randomUUID(), "Stephen", "Curry", "warriors@gmail.co,", Student.Gender.MALE),
                new Student(UUID.randomUUID(), "Klay", "Thompson", "warriors@gmail.co,", Student.Gender.MALE)
        );
    }
}
