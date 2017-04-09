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
  		(data:User[])=>{
  			this.users = data;
  		},
  		err=>{
        this.users = [];
  			this.notifications.create("error", err);
  		});
  }

}
