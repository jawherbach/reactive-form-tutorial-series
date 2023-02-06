import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter , MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import {ContryServiceService} from '../app/services/contry-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  listContry = [];

  constructor(private formBuilder: FormBuilder,
              private api:ContryServiceService,private dateAdapter: DateAdapter<Date>
                        
    ) {this.dateAdapter.setLocale('en-GB')}
  ngOnInit() {
    // try yo set value use set/patchvalue  this.profileForm.(patchValue/set)(firstName:"ffff")
  }
  profileForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.minLength(10)]],
    Email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    // contry: ['', [Validators.required]],
    items: this.formBuilder.array([
      this.formBuilder.group({
        phone: ['+216 97 317  '],
        job: ['devloppeur'],
      }),
      this.formBuilder.group({
        phone: ['+216 51 780 '],
        job: ['testeur'],
      }),
    ]),
  });

  addnew() {
    let lengtArray = this.items.length;

    let newRow = this.formBuilder.group({
      phone: [this.items],
      id: [lengtArray],
    });
    this.items.push(newRow);
  }

  remove(i) {
    this.items.removeAt(i);
    console.log('index', i);
  }

  saveForm() {
    if (this.profileForm.valid) {
      console.log('Profile form data : ', this.profileForm.value);
    }
  }

  getcontry() {
    this.api.getALLContryApi()
    .subscribe({
      next:res=>{
        alert("contry update Successfully");
        //this.listContry=this.myData.res   
      },
      error:err=>{
        console.log("this is Error",err)
      }
    })
  }

  get items() {
    return this.profileForm.get('items') as FormArray;
  }
  get firstName() {
    return this.profileForm.get('firstName');
  }
  get lastName() {
    return this.profileForm.get('lastName');
  }
  get address() {
    return this.profileForm.get('address');
  }
  get Email() {
    return this.profileForm.get('Email');
  }
  get password() {
    return this.profileForm.get('password');
  }
  get dob() {
    return this.profileForm.get('dob');
  }
  get gender() {
    return this.profileForm.get('gender');
  }
}
