import { Component, OnInit } from '@angular/core';
import {Event} from '../models/event.model';
import {Router} from '@angular/router';
import {EventsService} from '../network/events.service';
import {StockService} from '../network/stock.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  private events: Event[];

  constructor(private eventsService: EventsService,
  private stockService: StockService,
  private router: Router) { }

  ngOnInit() {
    this.eventsService.getTop()
      .subscribe(data=>{
        this.events=data;

    });
  }

  private navigate(event: Event){
    this.router.navigate([event.navRoute==""?".":event.navRoute]);

  }

}
