import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula'

class MapItem{
  constructor(public width: number,public height: number,private color: string, public x:number,public  y:number){
  }

  public intersects = (other: MapItem): boolean=>{
    if(this==other)
      return false;
    return (
        this.x >= other.x && this.x < other.x+other.width /*left side is inside the others area*/ 
        || this.x+this.width >= other.x && this.x+this.width < other.x+other.width  /*right side is inside the others area*/ 
       ) &&
       (
        this.y >= other.y && this.y < other.y+other.height /*top side is inside the others area*/ 
        || this.y+this.height >= other.y && this.y+this.height < other.y+other.height  /*bottom side is inside the others area*/ 
       );
  }
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {
  private rows: number = 8;
  private cols: number =16;

  private box_width = window.screen.height/this.cols;

  private map: Array<Array<Array<MapItem>>> = [];
  private items: Array<MapItem> = [];
  constructor(private dragulaService: DragulaService) {
    // console.log(window.screen.height);
    for(var i=0; i<this.rows;++i){
      this.map.push([]);
      for(var j=0; j<this.cols;++j){
        this.map[i].push([]);
        // if(i&j){
        //   this.map[i][j].push(`${i}${j}`);
        // }
      }
    }


    var item1 = new MapItem(2,2,"#ff0000", 2, 2);
    var item2 = new MapItem(2,2,"#00ff00", 0, 0);
    this.map[2][2].push(item1);
    this.map[0][0].push(item2);
    this.items.push(item1,item2);

    this.dragulaService.dropModel.subscribe(value=>{
      var item = value[1];
      var [from_x, from_y] = [+value[2].getAttribute("x_pos"), +value[2].getAttribute("y_pos")];
      var [to_x, to_y] = [+value[3].getAttribute("x_pos"), +value[3].getAttribute("y_pos")];
      this.map[from_y][from_x][0].x=to_x;
      this.map[from_y][from_x][0].y=to_y;
      // this.map[to_y][to_x].push(itemmodel);

      // console.log("item:", item.getAttribute("x_pos")," ", item.getAttribute("y_pos"));
      // console.log();

      // console.log("slot:", slot_to.getAttribute("x_pos")," ", slot_to.getAttribute("y_pos"));
      // console.log();

      // var x = +slot_to.getAttribute("x_pos");
      // var y = +slot_to.getAttribute("y_pos");
      // item.setAttribute("x_pos", x);
      // item.setAttribute("y_pos", y);

      // el.attributes.

    })
  }

  // private onDropModel(args) {
  //   let [el, target, source] = args;
  // }

  // private onRemoveModel(args) {
  //   let [el, source] = args;
  //   // do something else
  // }
  ngOnInit() {
    this.dragulaService.setOptions("bag-one", {
      accepts: (el: Element, source: Element, handle: Element, sibling: Element)=>{
         var [from_x, from_y] = [+handle.getAttribute("x_pos"), +handle.getAttribute("y_pos")];        
         var [to_x, to_y] = [+source.getAttribute("x_pos"), +source.getAttribute("y_pos")];
         if(from_x==to_x && from_y==to_y)
          return true;
         var element = this.map[from_y][from_x][0];
         var [elem_width, elem_height] = [element.width, element.height];

         for(var i=0; i<this.items.length;++i){
           if(element.intersects(this.items[i]))
            return false;
         }

         return source.children.length<1;
      }
    })
  }

}
