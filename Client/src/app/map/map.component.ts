import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula'
import { MapItem, Wall } from './map-item.model';
import { Grid } from './grid/grid';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less'],
})
export class MapComponent implements OnInit {
  private rows: number = 8;
  private rowIndexes = (Array(this.rows).fill(0).map((x,i)=>i));
  private cols: number = 18;
  private colIndexes = (Array(this.cols).fill(0).map((x,i)=>i));

  private box_width;

  private map: Grid<MapItem>;

  constructor(private dragulaService: DragulaService) {
    
  }

  onResize(div: ClientRect) {
    this.box_width = Math.ceil(div.width / this.cols);
  }

  ngOnInit() {
    this.map = new Grid<MapItem>(this.dragulaService, "grid", this.cols, this.rows);
    

    var item1 = new MapItem(4, 2, "#ff00ff");
    var item2 = new MapItem(2, 2, "#ffff00");
    var wall1 = new Wall(2,8);
    var wall2 = new Wall(3,4);
    this.map.addItem(item1, 0,0);
    this.map.addItem(item2, 2,2);
    this.map.addItem(wall1, 6,0);
    this.map.addItem(wall2, 12,3);
    


    window.dispatchEvent(new Event("resize"));
  }

  ngOnDestroy(){
    this.map.destoy();
  }
}
