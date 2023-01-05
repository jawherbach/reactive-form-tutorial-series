import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 

 constructor(private formBuilder:FormBuilder){}
 
 profileForm = this.formBuilder.group({
   firstName:['',[Validators.required]],
   lastName:['',[Validators.required]],
   address:['',[Validators.required]],
   dob:['',[Validators.required]],
   gender:['',[Validators.required]],
 });

 saveForm(){
   if(this.profileForm.valid){
     console.log('Profile form data : ', this.profileForm.value);
   }
 }

}
