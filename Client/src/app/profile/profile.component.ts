import { Component, OnInit , Attribute} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../network/user.service';
import { AuthenticationService } from '../auth/authentication.service';
import { NotificationsService } from '../notifications/notifications.service';
import { FormControl, FormBuilder, FormGroup, Validators, Validator, AbstractControl, ValidatorFn} from '@angular/forms';
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
  constructor(private fb: FormBuilder,
   private userService: UserService,
   private authService: AuthenticationService,
   private router: Router,
   private notif: NotificationsService) { 

  }

  ngOnInit() {
  	this.id = this.authService._userId;
  	let user = this.authService.user;
    this.userForm = this.fb.group({
        "name": [user.name, Validators.pattern(/\w+ \w+/)],
        "username": [user.username, Validators.minLength(4)],
        "newpass": ['',  [Validators.minLength(6), Validators.required]],
        "email": [user.email, Validators.required],
    })
    this.userForm.addControl("confirmpass", this.fb.control('',[
        CustomValidators.identicalValueTo(this.userForm.controls["newpass"])
      ]));
  }


  onSubmit(value){
  	if(!this.userForm.valid)
  		return;
  	if(value.newpass) {value.password=value.newpass; delete value["newpass"];delete value["confirmpass"];};
  	value.id=this.id;
    this.userService.updateUser(value).subscribe(res=>{
      this.authService.getUserData().subscribe(res=>{
          this.notif.create(this.notif.TYPE.SUCCESS, "Successfully modified data!", this.notif.DURATION.LONG);
          this.router.navigate(['/dashboard']);
      });
    });
  }


}


class CustomValidators{
  static identicalValueTo(original: AbstractControl): ValidatorFn{
    var validator =  new IdenticalValueValidator();
    return validator.getValidator(original);
  }
}

class IdenticalValueValidator {


  public getValidator(original: AbstractControl): ValidatorFn{
    return (control: AbstractControl) => this.validate(control, original)
  }
  private validate(control: AbstractControl, original: AbstractControl):{[key: string]: boolean}{
    if(original.value!==control.value){
      return {"IdenticalValueValidator": true};
    }
    return null;
  }
} 
