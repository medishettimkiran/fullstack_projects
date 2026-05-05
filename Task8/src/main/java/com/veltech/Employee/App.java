package com.veltech.Employee;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.veltech.Employee.Config.AppConfig;
import com.veltech.Employee.Service.EmployeeService;

public class App 
{
    public static void main( String[] args )
    {
      BeanFactory factory=new AnnotationConfigApplicationContext(AppConfig.class);
      EmployeeService service=factory.getBean(EmployeeService.class);
      service.createEmployee(101, "Rakesh", "CSE");
      service.createEmployee(102, "Vinnu", "ECE");
      service.createEmployee(103, "Abhi", "EEE");
      service.createEmployee(104, "Bot", "Hack");
      service.fetchAllEmployees().forEach(System.out::println);
    }
}
