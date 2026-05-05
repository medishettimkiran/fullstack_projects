package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.repository.StudentRepo;
import com.example.demo.model.Student;
@Service
public class StudentService {
	private final StudentRepo repo;

	public StudentService(StudentRepo repo) {
		this.repo = repo;
	}
	public Student saveStudent(Student s) {
		repo.save(s);
		return s;
	}
	public List<Student> getAllStudents()
	{
		return repo.findAll();
	}
	public Student getStudentById(int id) 
	{
	return repo.findById(id).orElse(null);
	}
   public  Student updateStudent(Student s) 
   {
	return repo.save(s);
   }
   public void deleteStudent(int id) 
   {
	   repo.deleteById(id);
   }
	

	
	

}
