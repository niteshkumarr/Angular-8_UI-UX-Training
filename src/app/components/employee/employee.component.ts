import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee'
import { Observable } from 'rxjs';
// import { RestService } from '../../service/rest.service';
import { RestService } from '../../_services/rest.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  dataSaved = false;
  allEmployees: Observable<Employee[]>
  employeeIdToUpdate = null;
  message = null;

  constructor(private builder: FormBuilder, private empService: RestService) { }

  ngOnInit(): void {
    this.employeeForm = this.builder.group({
      firstName: [''],
      lastName: [''],
      empEmail: ['',[Validators.email]],
      designation: [''],  
      address: [''],
      gender: [''],
    })

    this.loadAllEmployees();
  }

  loadAllEmployees(){
    this.allEmployees = this.empService.getAllEmployee();
  }

  onFormSubmit(){
    if(!this.employeeForm.valid){
      return
    }
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.createEmployee(employee);
    this.employeeForm.reset();
    this.employeeForm.markAsUntouched();
    this.employeeForm.markAsPristine();
  }

  createEmployee(employee: Employee){
    if(this.employeeIdToUpdate==null){
      this.empService.createEmployee(employee).subscribe(()=>{
        this.dataSaved = true;
        this.message = "Record Saved Sucessfully.";
        this.loadAllEmployees();
        this.employeeIdToUpdate=null;
        // this.employeeForm.reset();
      })
    }else{
      employee.id=this.employeeIdToUpdate;
      this.empService.updateEmployee(employee).subscribe(()=>{
        this.dataSaved = true;
        this.message = "Record Updated Sucessfully.";
        this.loadAllEmployees();
        this.employeeIdToUpdate=null;
        // this.employeeForm.reset();
      })
    }

  }

  resetForm(){
    this.employeeForm.reset();
    this.message = null;
    this.dataSaved = false;
    // this.employeeIdToUpdate=null;
  }

  loadEmployeeToEdit(employeeId: string){
    this.empService.getEmployeeById(employeeId).subscribe((employee)=>{
      this.message = null;
      this.dataSaved = false;
      this.employeeIdToUpdate = employee.id;
      this.employeeForm.controls['firstName'].setValue(employee.firstName);
      this.employeeForm.controls['lastName'].setValue(employee.lastName);
      this.employeeForm.controls['empEmail'].setValue(employee.empEmail);
      this.employeeForm.controls['designation'].setValue(employee.designation);
      this.employeeForm.controls['gender'].setValue(employee.gender);
      this.employeeForm.controls['address'].setValue(employee.address);
    })
  }

  deleteEmployee(employeeId: string){
    this.empService.deleteEmployee(employeeId).subscribe(()=>{
      this.message = "Record Deleted Sucessfully";
      this.loadAllEmployees();
      this.employeeIdToUpdate = null;
      this.employeeForm.reset();
    })
  }

}
