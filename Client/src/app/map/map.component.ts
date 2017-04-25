import { Component, OnInit } from '@angular/core';
import { Grid, Intersectable } from './grid/grid';
import { DragulaService } from 'ng2-dragula'


class MapItem implements Intersectable {
  public x: number;
  public y: number;
  private static id_counter:number = 0;
  private id: number;
  constructor(public width: number, public height: number, private color: string) {
    this.id = MapItem.id_counter++;
  }

  public intersects = (other: MapItem): boolean => {
    if (this.id == other.id)
      return false;
    return (
        this.x >= other.x && this.x < other.x + other.width /*left side is inside the others area*/
        || this.x + this.width > other.x && this.x + this.width <= other.x + other.width  /*right side is inside the others area*/
      ) &&
      (
        this.y >= other.y && this.y < other.y + other.height /*top side is inside the others area*/
        || this.y + this.height > other.y && this.y + this.height <= other.y + other.height  /*bottom side is inside the others area*/
      );
  }

  public clone = () : MapItem =>{
    var item = new MapItem(this.width, this.height, this.color);
    item.x = this.x;
    item.y = this.y;
    item.id = this.id;
    return item;
  }
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less'],
  // host:{
  //   '(window:resize)': 'onResize($event)'
  // }
})
export class MapComponent implements OnInit {
  private rows: number = 8;
  private rowIndexes = (Array(this.rows).fill(0).map((x,i)=>i));
  private cols: number = 16;
  private colIndexes = (Array(this.cols).fill(0).map((x,i)=>i));

  private box_width = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight) / this.cols;

  private map: Grid<MapItem>;

  constructor(private dragulaService: DragulaService) {
      this.map = new Grid<MapItem>(this.dragulaService, this.cols, this.rows);
  }

  onResize(div: ClientRect) {
    this.box_width = div.width / this.cols;
  }

  ngOnInit() {


    var item3 = new MapItem(3, 2, "#ff00ff");
    var item1 = new MapItem(2, 2, "#ffff00");

    this.map.addItem(item3, 0,0);
    this.map.addItem(item1, 2,2);

    window.dispatchEvent(new Event("resize"));
  }


}
