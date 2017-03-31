import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { StockItem } from '../../models/stock.model';
@Component({
  selector: 'stock-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {
  
  private item: StockItem;
  constructor(private route: ActivatedRoute) { 

  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.item = new StockItem(+params['id'], "Játszótér", "A Lorem Ipsum egy egyszerû szövegrészlete, szövegutánzata a betûszedõ és nyomdaiparnak. A Lorem Ipsum az 1500-as évek óta standard szövegrészletként szolgált az iparban; mikor egy ismeretlen nyomdász összeállította a betûkészletét és egy példa-könyvet vagy szöveget nyomott papírra, ezt használta.") ;
    })
  }

}
