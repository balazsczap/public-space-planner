import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockItem } from '../models/stock.model';
import { StockService } from '../network/stock.service';
import { NotificationsService } from '../notifications/notifications.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.less']
})
export class StockComponent implements OnInit {

  private stock: StockItem[];

  constructor(private router: Router, 
  private stockService: StockService,
  private notifications: NotificationsService) {}

  onSelect(item: StockItem){
    this.router.navigate(['/stock', item.id]);
  }

  ngOnInit() {
    this.stockService.getAll()
      .subscribe(items=>{
        this.stock = items;
      },
      err=>{
        this.notifications.createDefaultError(err);
      });
  }

}
