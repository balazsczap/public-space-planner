import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import { StockItem } from '../../models/stock.model';
import { StockService } from '../../network/stock.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { AuthenticationService } from '../../auth/authentication.service';
import {Comment} from '../../models/comment.model';
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
  private router: Router,
  private stockService: StockService,
  private notifications: NotificationsService,
  private auth: AuthenticationService) { 

  }

  canEdit(): boolean{
    return this.item.creator.id==this.auth.user.id || this.auth.user.role=='admin';
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
  deleteItem(){
    this.stockService.deleteItem(this.itemId)
      .subscribe(data=>{
        this.router.navigate(["/stock"]);
      });
  }

  editItem(){
    this.router.navigate(["/stock/"+this.item.id+"/edit"]);
  }
  private updateComments(){
      this.stockService.getOneById(this.itemId)
        .subscribe(data=>{
          this.item = data;
        }, 
        err=>{
          this.router.navigate(["/404"]);
      });
  }

  deleteComment(id: number){
    this.stockService.deleteCommentOf(this.item.id, id)
      .subscribe((success:boolean)=>{
        if(success){
          var index = this.item.comments.findIndex((item)=>(item.id==id));
          this.item.comments.splice(index,1);
        }
      })
  }
}
