import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators, FormGroup, AbstractControl , FormControl} from '@angular/forms';
import { UserService } from '../../network/user.service';
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
  constructor(fb: FormBuilder, private userService: UserService) { 
  	this.addUserForm = fb.group({
  		"name": ['', Validators.pattern("\\w+ \\w+[ \\w]+")],
  		"email": ['', Validators.required]
  	})
  }
  private userUrl : string;
  ngOnInit() {
  }

  onSubmit(value: string){
     var email = this.addUserForm.get("email").value;
     // console.log(value);
     this.userService.createNew(email)
         .subscribe(data=>this.userUrl="/api/auth/firsttime/"+data);
  }

}
