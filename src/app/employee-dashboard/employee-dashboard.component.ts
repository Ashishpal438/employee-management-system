import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms'
import { EmployeeModel } from '../employee-model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObject : EmployeeModel = new EmployeeModel()
  employeeData: any;
  showAdd !: boolean
  showUpdate !: boolean
  
  constructor(private formbuilder : FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile: [''],
      salary: ['']
    })

    this.getAllEmployee()
  }

  clickAddEmployee(){
    this.formValue.reset()
    this.showAdd = true
    this.showUpdate = false
  }

  postEmployeeDetails(){
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.mobile = this.formValue.value.mobile;
    this.employeeModelObject.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObject)
    .subscribe(res => {
      console.log(res);
      alert("Employee Added Successfully")
      this.formValue.reset();
      this.getAllEmployee()
    },
    err => {
      alert('Something went wrong!');
    }
    )
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res => {
      this.employeeData = res
    })
  }

  deleteEmployee(row:any){
    console.log(row.id);
    this.api.deleteEmployee(row.id)
    .subscribe(res => {
      console.log(res)
      alert('Employee deleted Successfully');
      this.getAllEmployee()
  })
  }

  onEdit(row:any){
    this.showAdd = false
    this.showUpdate = true
    this.employeeModelObject.id = row.id
    this.formValue.controls['firstName'].setValue(row.firstName)
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['mobile'].setValue(row.mobile)
    this.formValue.controls['salary'].setValue(row.salary)
  }

  updateEmployeeDetails(){
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.mobile = this.formValue.value.mobile;
    this.employeeModelObject.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObject, this.employeeModelObject.id)
    .subscribe(res => {
      alert("Employee Updated Successfully")
      this.getAllEmployee()
    })
  }

}
