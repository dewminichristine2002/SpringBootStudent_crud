// src/main/java/com/example/studentcrud/service/StudentService.java
package com.example.studentcrud.service;

import com.example.studentcrud.model.Student;
import com.example.studentcrud.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepo;

    public StudentService(StudentRepository studentRepo) {
        this.studentRepo = studentRepo;
    }

    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    public Student createStudent(Student student) {
        return studentRepo.save(student);
    }

    public Student updateStudent(Long id, Student updatedStudent) {
        Student student = studentRepo.findById(id).orElseThrow();
        student.setName(updatedStudent.getName());
        student.setEmail(updatedStudent.getEmail());
        return studentRepo.save(student);
    }

    public void deleteStudent(Long id) {
        studentRepo.deleteById(id);
    }
}
