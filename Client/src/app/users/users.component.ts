import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../network/user.service';
import { NotificationsService } from '../notifications/notifications.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {

  private users: User[];

  constructor(private router: Router, 
  private userService: UserService,
  private notifications: NotificationsService) {}

  onSelect(user: User){
    this.router.navigate(['/users', user.id]);
  }

  ngOnInit() {
    this.userService.getAll()
      .subscribe(users=>{
        this.users = users;
      },
      err=>{
        this.notifications.createDefaultError(err);
      });
  }

}
