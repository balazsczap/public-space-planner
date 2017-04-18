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
        // this.events = data.map(e=>{
          
        // })
        // this.events = data.map(e=>{
        //   if(e.entityType == "user"){
        //     e.message="A user was ";
        //     e.navRoute="/users/";
        //   }
        //   else if(e.entityType=="stock"){
        //     e.message="A stock item was ";
        //     e.navRoute="/stock/";
        //     this.stockService.getOneById(e.entityId)
        //       .subscribe(data=>{
        //         e.doneBy=data.creator;
        //       },
        //       err=>{
                
        //       })
        //   }

        //   if(e.eventType == "creation"){
        //     e.message+="created.";
        //     e.navRoute+=e.entityId;
        //   }
        //   else if(e.eventType == "modification"){
        //     e.message+="modified.";
        //     e.navRoute+=e.entityId;
        //   }
        //   else if(e.eventType == "deletion"){
        //     e.message+="deleted!";
        //     e.navRoute="";
        //   }
        //   else if(e.eventType == "rate"){
        //     e.message+="rated.";
        //     e.navRoute+=e.entityId;
        //   }
        //   return e;
        // });
    });
  }

  private navigate(event: Event){
    this.router.navigate([event.navRoute==""?".":event.navRoute]);

  }

}
