import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators, FormGroup, AbstractControl , FormControl} from '@angular/forms';
@Component({
  selector: 'app-add-user',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddUserComponent implements OnInit {
  addUserForm = new FormGroup({
  		"name": new FormControl(),
  		"email": new FormControl()
  });
  constructor(fb: FormBuilder) { 
  	this.addUserForm = fb.group({
  		"name": ['', Validators.pattern("\\w+ \\w+[ \\w]+")],
  		"email": ['', Validators.required]
  	})
  }

  ngOnInit() {
  }

  onSubmit(value: string){
  	console.log(this.addUserForm.valid)
  	console.log(value);
  }

}
