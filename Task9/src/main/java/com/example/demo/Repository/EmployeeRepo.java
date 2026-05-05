
   package com.example.demo.Repository;

import java.util.Map;

import org.springframework.stereotype.Component;

import com.example.demo.Employee;

@Component 
public class EmployeeRepo {
	private final Map<Integer,Employee> store=Map.of(
			 101,new Employee(101,"Rakesh","CSE"),
			 102,new Employee(102,"Vinnu","ECE"),
			 103,new Employee(103,"Abhi","CSE"),
			 104,new Employee(104,"BOT","Hack")
			);
public Employee findById(int id) {
	return store.get(id);
	}
}
