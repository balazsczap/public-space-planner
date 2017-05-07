import { StockItem } from '../models/stock.model';


export interface Intersectable {
    x: number;
    y: number;
    width: number;
    height: number;
    id: number;
    intersects(other: Intersectable): boolean;
    clone(): Intersectable;
    draggable: boolean;
}

export class MapItem extends StockItem implements Intersectable {
  public x: number;
  public y: number;
  protected static id_counter:number = 0;
  protected _draggable: boolean = true;
  constructor(id:number, width: number, height: number, name: string, imageUrl: string){
    super();
    this.id = id;
    this.width = width;
    this.height = height;
    this.name = name;
    if(imageUrl.match(/^#[0-9a-f]{6}$/)){
        this.colored = true;
    }
    this._imageUrl= imageUrl;

    
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
    var item = new MapItem(this.id, this.width, this.height,this.name, this.imageUrl);
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
    super(-2, width,height,"Wall","#ffffff");
    this._draggable=false;
  }
}


