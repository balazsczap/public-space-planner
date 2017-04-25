import { Component, OnInit } from '@angular/core';
import { Grid, Intersectable } from './grid/grid';
import { DragulaService } from 'ng2-dragula'


class MapItem implements Intersectable {
  public x: number;
  public y: number;
  protected static id_counter:number = 0;
  public id: number;
  protected _draggable: boolean = true;
  
  constructor(public width: number, public height: number, private color: string) {
    this.id = MapItem.id_counter++;
  }

  public intersects = (other: Intersectable): boolean => {
    if (this.id == other.id)
      return false;
    console.log(this.x);
    console.log(this.y);
    
    var left_inside = this.x >= other.x && this.x < other.x + other.width;
    var right_inside = this.x + this.width > other.x && this.x + this.width <= other.x + other.width;
    var x_overlap = this.x <= other.x && this.x+this.width >= other.x+other.width;
    var top_inside = this.y >= other.y && this.y < other.y + other.height;
    var bottom_inside = this.y + this.height > other.y && this.y + this.height <= other.y + other.height;
    var y_overlap = this.y <= other.y && this.y+this.height >= other.y+other.height;
    return (left_inside || right_inside || x_overlap) && (top_inside || bottom_inside || y_overlap);
    // return (
    //     this.x >= other.x && this.x < other.x + other.width /*left side is inside the others area*/
    //     || this.x + this.width > other.x && this.x + this.width <= other.x + other.width  /*right side is inside the others area*/
    //   ) &&
    //   (
    //     this.y >= other.y && this.y < other.y + other.height /*top side is inside the others area*/
    //     || this.y + this.height > other.y && this.y + this.height <= other.y + other.height  /*bottom side is inside the others area*/
    //   );
  }

  public clone = () : Intersectable =>{
    var item = new MapItem(this.width, this.height, this.color);
    item.x = this.x;
    item.y = this.y;
    item.id = this.id;
    this._draggable = item._draggable;
    return item;
  }
  get draggable(): boolean{
    return this._draggable;
  }


}

class Wall extends MapItem{
  
  constructor(public width: number, public height: number) {
    super(width,height,"");
    this.id = MapItem.id_counter++;
    this._draggable=false;
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
