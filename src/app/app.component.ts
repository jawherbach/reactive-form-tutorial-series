import { Component } from '@angular/core';

//import {TableService} from './table.service';


interface Tile{
  color:string;
  cols:number;
  rows:number;
  text:string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
   tiles: Tile[] = [
     //{text: 'one ', cols: 1, rows: 2, color: 'lightgreen'},
     {text: 'two  ', cols: 2, rows: 2 , color: 'red'},
 
    //  {text: '', cols: 1, rows: 1, color: '#514256'},
    //  {text: '', cols: 1, rows: 1, color: 'lightpink'},
   ];
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
     console.log('Profile form data :: ', this.profileForm.value);
   }
 }

}
