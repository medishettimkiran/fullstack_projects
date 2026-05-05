package com.veltech.Employee.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.veltech.Employee.Repo.EmployeeRepository;
import com.veltech.Employee.model.Employee;
@Component
public class EmployeeService {
	@Autowired
private EmployeeRepository employeerepository;
public void createEmployee(int id,String name,String dept) {
	Employee emp=new Employee(id,name,dept);
	employeerepository.addEmployee(emp);
	
}
public List<Employee> fetchAllEmployees(){
	return employeerepository.Empdata();
}
}
