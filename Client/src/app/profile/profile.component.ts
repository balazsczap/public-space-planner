import { Component, OnInit , Attribute} from '@angular/core';
import { ActivatedRoute }from '@angular/router';
import { UserService } from '../network/user.service';
import { AuthenticationService } from '../auth/authentication.service';
import { FormControl, FormBuilder, FormGroup, Validators, Validator, AbstractControl} from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})


export class ProfileComponent implements OnInit {

  id: number;
  // userForm = new FormGroup({
  // 		"name": new FormControl(),
  // 		"username": new FormControl(),
  // 		"newpass":new FormControl(),
  // 		"confirmpass":new FormControl(),
  // 		"email": new FormControl(),

  // });

  userForm :FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthenticationService, private route: ActivatedRoute) { 

  }

  ngOnInit() {
  	this.id = this.authService._userId;
  	let user = this.authService.user;
	this.userForm = this.fb.group({
  		"name": [user.name, Validators.pattern(/\w+ \w+/)],
  		"username": [user.username, Validators.minLength(4)],
  		"newpass": ['', Validators.minLength(6),],
  		"confirmpass": ['', this.validatePassword],
  		"email": [user.email, Validators.required],
	})

	console.log(this.userForm.controls["name"].valid);
  	// this.route.params.subscribe(params=>{
  	// 	this.id=params["id"];

  	// 	// this.userService.getUserById(this.id).subscribe(user=>{
  	// 	// 	console.log(user);

  	// 	// });
  	// 	var user = 

  	// });
  	// this.id = this.route.params["id"];
  }
	private validatePassword() {
        let that = this;
        return (c: FormControl) =>
        {
            return (c.value === that.userForm.controls["passworď"].value) ? null : {'passwordMatch': {valid: false}};
        }
    }

  onSubmit(value){
  	if(!this.userForm.valid)
  		return;
  	if(value.newpass) {value.password=value.newpass; delete value["newpass"];delete value["confirmpass"];};
  	value.id=this.id;
    this.userService.updateUser(value).subscribe(res=>{
      this.authService.getUserData().subscribe(res=>{
        console.log(res);
      });
    });
  }
}
