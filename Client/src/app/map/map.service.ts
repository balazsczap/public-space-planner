import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { MapItem,StockItem,Wall } from "./map-item.model";
import { Grid } from "./grid/grid";
import { DragulaService } from "ng2-dragula";
import { Intersectable } from './grid/intersectable.interface';


@Injectable()
export class MapService<T extends Intersectable> {
    private readonly cols: number = 18;
    private readonly rows: number = 8;
    public getCols():number{
        return this.cols;
    }
    
    public getRows():number{
        return this.rows;
    }
    private readonly _bagName = "grid"; 

    public get bagName() : string{
        return this._bagName;
    }
    private map: Array<Array<Array<T>>> = [];
    private mapItems: Array<T> = [];
    private stock: Array<T> = [];
    private dropSubscription: any;
    constructor(private dragulaService: DragulaService) {
        //fill map with slots
        for (var i = 0; i < this.rows; ++i) {
            this.map.push([]);
            for (var j = 0; j < this.cols; ++j) {
                this.map[i].push([]);
            }
        }
        this.dragulaService.drop.subscribe((value:Element[])=>{
            var item = value[1];
            var source = value[3];
            var target = value[2];
            
            var element = this.findItem(+item.getAttribute("_id"));
            this.mapItems.push(element);
        });
        //after drop, set the current coordinates of the item
        this.dropSubscription = this.dragulaService.dropModel.subscribe((value:Element[]) => {
            //value is [bagName, element, target, source]
            var item = value[1];
            var source = value[3];
            var target = value[2];
            if(source.classList.contains("map-add-item-container") && target.classList.contains("drag-map-slot")){
                console.log(item);
                // item = item.children[0];
                console.log(item);
                
                var [to_x, to_y] = [+target.getAttribute("x_pos"), +target.getAttribute("y_pos")];
                console.log(+item.getAttribute("_id"));
                var element = this.findItem(+item.getAttribute("_id"));

                console.log(element);
                console.log(this.map);
                console.log(this.stock);
                this.map[to_y][to_x][0] = element;
                this.mapItems.push(element);
                this.stock.splice(this.stock.findIndex(e=>e.id==element.id), 1);
            }
            else{
                var [to_x, to_y] = [+target.getAttribute("x_pos"), +target.getAttribute("y_pos")];
                var element = this.findItem(+item.getAttribute("_id"));
                element.x = to_x;
                element.y = to_y;
            }





        })
        // this.dragulaService.over.subscribe((value:Element[])=>{
        //         var element = value[1];
        //         var target = value[2];

        //     });
        this.dragulaService.setOptions(this._bagName, {

            moves: (el: Element, source: Element, handle: Element, sibling: Element) => {
                var element = this.map[+el.getAttribute("y_pos")][+el.getAttribute("x_pos")][0];
                return element.draggable;
            },
            //accepts is called by dragula to see if the element being dragged can be dropped in target
            accepts: (el: Element, target: Element, source: Element, sibling: Element) => {
                //if target is not part of the map
                // console.log("accepts");
                if(target.classList.contains("map-add-item-container")){
                    return true;
                }

                //get the coordinates of the slots, which are stored as HTML attributes
                var [from_x, from_y] = [+source.getAttribute("x_pos"), +source.getAttribute("y_pos")];
                var [to_x, to_y] = [+target.getAttribute("x_pos"), +target.getAttribute("y_pos")];

                //if it's not being actually moved, it can be dropped
                if (from_x == to_x && from_y == to_y)
                    return true;

                var element;
                if(source.classList.contains("map-add-item-container")){

                    // element = this.getItemFromStock(+el.children[0].getAttribute("_id"));
                    element = this.getItemFromStock(+el.getAttribute("_id"));          
                }
                else{
                    element = this.getItemFromMap(from_y, from_x);
                }

               

                //create a clone which can be tested for intersection with any other elements
                var tester = element.clone();
                tester.x = to_x;
                tester.y = to_y;
                if (tester.x + tester.width > this.cols || tester.y + tester.height > this.rows) {
                    return false;
                }
                //check for intersection with other elements
                for (var i = 0; i < this.mapItems.length; ++i) {
                    if (tester.intersects(this.mapItems[i]))
                        return false;
                }
                
                //check for intersection with the sides of the grid

                // return source.children.length<=1;
                return true;
            }


        });

        
    }
    public addItemToMap(item: T, x: number, y: number) {
        this.map[y][x].push(item);
        this.mapItems.push(item);
        item.x = x;
        item.y = y;
    }

    public addItemToStock(item: T){
        this.stock.push(item);
    }

    public getSlot(y: number, x: number) {
        return this.map[y][x];
    }

    public getStock(){
        return this.stock;
    }

    public findItem(id:number) {
        var itemFromMap = this.mapItems.find(t=>t.id==id);
        if(itemFromMap)
            return itemFromMap;
        var itemFromStock = this.stock.find(t=>t.id==id);
        return itemFromStock;
    }

    public getItemFromMap(y: number, x: number) {
        if (this.map[y][x].length == 0) {
            return null;
        }
        return this.map[y][x][0];
    }

    public getItemFromStock(id:number){
        return this.stock.find(t=>t.id==id);
    }

    public destoy(): void {
        this.dropSubscription.unsubscribe();

        this.dragulaService.destroy(this.bagName);
    }
}