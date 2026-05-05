package com.veltech.Employee.Repo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.veltech.Employee.model.Employee;
@Component
public class EmployeeRepository {
	private List<Employee> empli=new ArrayList<>();
	public void addEmployee(Employee employee) {
		empli.add(employee);
	}
	public List<Employee> Empdata(){
		return empli;
	}

}
