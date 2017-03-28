import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators, FormGroup, AbstractControl , FormControl} from '@angular/forms';
import { UserService } from '../../network/user.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddUserComponent implements OnInit {
  private addUserForm: FormGroup;

  constructor(fb: FormBuilder, private userService: UserService) { 
  	this.addUserForm = fb.group({
  		"name": ['', Validators.pattern(/\w+ \w+/)],
  		"email": ['', Validators.required],
      "role":['', Validators.required]
  	})
  }
  private userUrl : string;
  ngOnInit() {
  }

  onSubmit(userData: string){
     var email = userData["email"];
     var name = userData["name"];
     var role = userData["role"];

     this.userService.createNew(name,email,role)
         .subscribe(data=>{
           this.userUrl="/login/firsttime/"+data["token"];
        });
  }

}
