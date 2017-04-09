import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../network/user.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { AuthenticationService } from '../../auth/authentication.service';
import {Comment} from '../../models/comment.model';
import {Rating} from '../../models/rating.model';
@Component({
  selector: 'user-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {
  private user: User;
  constructor(
  private route: ActivatedRoute,
  private router: Router,
  private userService: UserService,
  private notifications: NotificationsService,
  private auth: AuthenticationService) { 

  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      var userId = +params['id'];
      this.userService.getUserById(userId)
        .subscribe(data=>{
          this.user = data;
        })
    });
  }




}
