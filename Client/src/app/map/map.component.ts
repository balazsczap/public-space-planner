import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula'
import { MapItem, Wall, StockItem } from './map-item.model';
import { MapService } from './map.service';

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

  private box_width;

  // @ViewChild('myname') input; 
  constructor(private mapService: MapService<MapItem>) {
    this.rows = mapService.getRows();
    this.cols = mapService.getCols();
    this.rowIndexes = (Array(this.rows).fill(0).map((x,i)=>i));
    this.colIndexes = (Array(this.cols).fill(0).map((x,i)=>i));
  }

  onResize(div: ClientRect) {
    this.box_width = Math.ceil(div.width / this.cols);
  }

  ngOnInit() {
    // var item1 = new StockItem(4, 2, "Szökőkút", "/assets/person_img.jpg" );
    // var item1 = new StockItem(4, 2, "Szökőkút", "/assets/person_img.jpg" );
    var item1 = new StockItem(4, 2, "Szökőkút", "#00ffff" );
    var item2 = new StockItem(2, 2, "Kutyafuttató","#00ff00" );
    var wall1 = new Wall(2,8);
    var wall2 = new Wall(7,2);
    this.mapService.addItemToMap(item1, 6,12);
    this.mapService.addItemToMap(item2, 2,2);
    this.mapService.addItemToMap(wall1, 0,6);
    this.mapService.addItemToMap(wall2, 3,11);
    this.mapService.addItemToMap(new Wall(2,1), 0,16);
    this.mapService.addItemToMap(new Wall(1,1), 1,17);
    this.mapService.addItemToMap(new Wall(1,1), 6,17);
    this.mapService.addItemToMap(new Wall(2,1), 7,16);

    this.mapService.addItemToMap(new Wall(2,1), 0,0);
    this.mapService.addItemToMap(new Wall(1,1), 1,0);
    this.mapService.addItemToMap(new Wall(1,1), 6,0);
    this.mapService.addItemToMap(new Wall(2,1), 7,0);

    this.mapService.addItemToStock(new StockItem(1,1,"Játszótér","#0000ff"));
    this.mapService.addItemToStock(new StockItem(1,2,"Pad","#ff00ff"));
    this.mapService.addItemToStock(new StockItem(2,2,"Tűzrakó hely","#ffaa11"));

    window.dispatchEvent(new Event("resize"));
  }

  getItem(row:number,col:number):MapItem{
    return this.mapService.getItemFromMap(row,col);
  }

  getSlot(row:number, col:number){
    return this.mapService.getSlot(row,col);
  }

  ngOnDestroy(){
    this.mapService.erase();
  }

}
