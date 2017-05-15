import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula'
import { MapItem, Wall } from './map-item.model';
import { StockItem } from '../models/stock.model';
import { ConcreteMapService } from './concrete.map.service';
import { UserService } from "app/network/user.service";
import { User } from "app/models/user.model";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less'],
})
export class MapComponent implements OnInit {
  private rows: number;
  private rowIndexes;
  private cols: number;
  private colIndexes;

  private readonly map_bg = "/assets/map.png";
  private box_width;

  private loaded = false;

  private stockHidden: boolean = true;
  private loadHidden: boolean = true;

  private otherUsers:User[] = []; 
  // @ViewChild('myname') input; 
  constructor(private mapService: ConcreteMapService, private userService: UserService) {
    this.rows = mapService.getRows();
    this.cols = mapService.getCols();
    this.rowIndexes = (Array(this.rows).fill(0).map((x, i) => i));
    this.colIndexes = (Array(this.cols).fill(0).map((x, i) => i));
    
    mapService.reload();
    mapService.load();
    mapService.loadingFinished.subscribe(value=>{
      this.loaded=value;
    })

    this.userService.getAll().subscribe(users=>{
      this.otherUsers = users;
    });
  }

  onResize(div: ClientRect) {
    this.box_width = Math.ceil(div.width / this.cols);
  }

  ngOnInit() {

    window.dispatchEvent(new Event("resize"));
  }

  getItem(row: number, col: number): MapItem {
    return this.mapService.getItemFromMap(row, col);
  }

  getSlot(row: number, col: number) {
    return this.mapService.getSlot(row, col);
  }

  ngOnDestroy() {
    // this.mapService.reload();
  }


  showStock(){
    this.loadHidden =  true;
    this.stockHidden = false;
  }
  showLoad(){
    this.loadHidden = false;
    this.stockHidden = true;
  }
  showMenu(){
    this.stockHidden = true;
    this.loadHidden = true;
  }

  showMap(user: User){
    this.loaded=false;
    this.userService.getMapOf(user).subscribe(mapStr=>{
      
      // console.log(mapStr)
      this.mapService.reload();
      this.mapService.loadOther(mapStr);
    })
  }

  save() {
    this.mapService.save();
  }

}
