import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ContryServiceService } from '../app/services/contry-service.service';

// import {
//   MAT_MOMENT_DATE_FORMATS,
//   MomentDateAdapter,
//   MAT_MOMENT_DATE_ADAPTER_OPTIONS,
// } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import 'moment/locale/ja';
import 'moment/locale/fr';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
     {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
     },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class AppComponent implements OnInit {
  listContry = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: ContryServiceService,
    private dateAdapter: DateAdapter<Date>,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {}
  ngOnInit() {
    //this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
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
    this.api.getALLContryApi().subscribe({
      next: (res) => {
        alert('contry update Successfully');
        //this.listContry=this.myData.res
      },
      error: (err) => {
        console.log('this is Error', err);
      },
    });
  }

  french() {
    this._locale = 'fr';
    this._adapter.setLocale(this._locale);
  }

  getDateFormatString() {
    if (this._locale === 'en-GB') {
      return 'YYYY/MM/DD';
    } else if (this._locale === 'fr') {
      return 'DD/MM/YYYY';
    }
    return '';
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
