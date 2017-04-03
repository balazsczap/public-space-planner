import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import { StockItem } from '../../models/stock.model';
import { StockService } from '../../network/stock.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { AuthenticationService } from '../../auth/authentication.service';
@Component({
  selector: 'stock-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {
  private itemId: number;
  private item: StockItem;
  constructor(
  private fb: FormBuilder,
  private route: ActivatedRoute,
  private stockService: StockService,
  private notifications: NotificationsService,
  private auth: AuthenticationService) { 

  }

  ayy(c: Comment):boolean{
    return true;
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.itemId = +params['id'];
      this.updateComments();
    });
  }

  onSubmit(formdata: any){
    
    this.stockService.postComment(this.item.id, formdata.comment)
      .subscribe(data=>{
        this.updateComments();
      })
  }

  private updateComments(){
      this.stockService.getOneById(this.itemId)
        .subscribe(data=>{
          this.item = data;
        });
  }
}
