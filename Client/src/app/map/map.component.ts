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
        || this.x+this.width > other.x && this.x+this.width <= other.x+other.width  /*right side is inside the others area*/ 
       ) &&
       (
        this.y >= other.y && this.y < other.y+other.height /*top side is inside the others area*/ 
        || this.y+this.height > other.y && this.y+this.height <= other.y+other.height  /*bottom side is inside the others area*/ 
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
    var item3 = new MapItem(1,1,"#ff00ff", 4, 4);
    var item4 = new MapItem(1,2,"#ffff00", 3, 4);
    this.map[2][2].push(item1);
    this.map[0][0].push(item2);
    this.map[4][4].push(item3);
    this.map[4][3].push(item4);
    this.items.push(item1,item2,item3,item4);

    this.dragulaService.dropModel.subscribe(value=>{
      var item = value[1];
      var [to_x, to_y] = [+value[2].getAttribute("x_pos"), +value[2].getAttribute("y_pos")];
      var [from_x, from_y] = [+value[3].getAttribute("x_pos"), +value[3].getAttribute("y_pos")];
      this.map[to_y][to_x][0].x=to_x;
      this.map[to_y][to_x][0].y=to_y; 
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
         if(element==undefined){
           var ayy = "lmao";
         }
         var [elem_width, elem_height] = [element.width, element.height];
         var new_tester = new MapItem(element.width, element.height, "0xffffff", to_x, to_y);
         for(var i=0; i<this.items.length;++i){
           if(new_tester.intersects(this.items[i]))
            return false;
         }
         if(new_tester.x+new_tester.width>this.cols || new_tester.y+new_tester.height > this.rows){
           return false;
         }


         return source.children.length<1;
      }
    })
  }

}
