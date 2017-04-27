import { Intersectable } from './grid/intersectable.interface';

export class MapItem implements Intersectable {
  public x: number;
  public y: number;
  protected static id_counter:number = 0;
  public id: number;
  protected _draggable: boolean = true;
  
  constructor(public width: number, public height: number, private color: string) {
    this.id = MapItem.id_counter++;
  }

  public intersects = (other: Intersectable): boolean => {
    //they are the same item
    if (this.id == other.id)
      return false;

    var left_inside = this.x >= other.x && this.x < other.x + other.width;
    var right_inside = this.x + this.width > other.x && this.x + this.width <= other.x + other.width;
    var horizontal_overlap = this.x <= other.x && this.x+this.width >= other.x+other.width;

    var top_inside = this.y >= other.y && this.y < other.y + other.height;
    var bottom_inside = this.y + this.height > other.y && this.y + this.height <= other.y + other.height;
    var vertical_overlap = this.y <= other.y && this.y+this.height >= other.y+other.height;

    return (left_inside || right_inside || horizontal_overlap) && (top_inside || bottom_inside || vertical_overlap);
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

export class Wall extends MapItem{
  
  constructor(public width: number, public height: number) {
    super(width,height,"");
    this.id = MapItem.id_counter++;
    this._draggable=false;
  }
}

export class StockItem extends MapItem{
  public bgImageUrl: string;
  constructor(public width: number, public height: number, public name: string, public bgOrColor: string){
    super(width,height,bgOrColor.match(/#.{6}/)?bgOrColor:"");
    if(!bgOrColor.match(/#.{6}/))
      this.bgImageUrl = bgOrColor;
    
  }
}