import { Component, OnInit } from '@angular/core';

import { UserService } from '../network/user.service'; 
import { User } from '../models/user.model';
import { NotificationsService } from '../notifications/notifications.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  
  private users: User[];

  constructor(private userService: UserService, private notifications: NotificationsService) { }

  ngOnInit() {
  	this.userService.getAll().subscribe(
  		data=>{
  			this.users = data;
  			console.log(this.users);
  		},
  		err=>{
  			this.notifications.create("error", err);
  		});
  }

}
