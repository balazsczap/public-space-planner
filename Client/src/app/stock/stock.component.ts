import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockItem } from '../models/stock.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.less']
})
export class StockComponent implements OnInit {

  private stock: StockItem[] = []; 

  constructor(private router: Router) {
    for(var i=0; i<10;++i){
      var item = new StockItem(i,"Játszótér", "Leírássssssssssssssssssssss", i);
      this.stock.push(item);    
    }
  }

  onSelect(item: StockItem){
    this.router.navigate(['/stock', item.id]);
  }

  ngOnInit() {
  }

}
