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

        //set up dragula event handlers
        this.dragulaSetup();

    }

    


    public addItemToMap(item: T, y: number, x: number) {
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
    public erase(){
        this.mapItems = [];
        this.map = [];
         //fill map with slots
        for (var i = 0; i < this.rows; ++i) {
            this.map.push([]);
            for (var j = 0; j < this.cols; ++j) {
                this.map[i].push([]);
            }
        }
        this.stock=[];
        
    }


    private dragulaSetup(){
                this.dragulaService.drop.subscribe((value:Element[])=>{
            var item = value[1];
            var source = value[3];
            var target = value[2];
            var element = this.findItem(+item.getAttribute("_id"));
            if(source.classList.contains("map-add-item-container") && target.classList.contains("drag-map-slot")){
                this.mapItems.push(element);
            }
            else if(target.classList.contains("map-add-item-container") && source.classList.contains("drag-map-slot")){
                this.mapItems.splice(this.mapItems.indexOf(element), 1);
            }

        });
        //after drop, set the current coordinates of the item
        this.dropSubscription = this.dragulaService.dropModel.subscribe((value:Element[]) => {
            //value is [bagName, element, target, source]
            var item = value[1];
            var source = value[3];
            var target = value[2];
            var [to_x, to_y] = [+target.getAttribute("x_pos"), +target.getAttribute("y_pos")];
            var element = this.findItem(+item.getAttribute("_id"));
            if(source.classList.contains("map-add-item-container") && target.classList.contains("drag-map-slot")){
                
                this.map[to_y][to_x][0] = element;
                this.mapItems.push(element);
            }

            element.x = to_x;
            element.y = to_y;
        })

        this.dragulaService.setOptions(this._bagName, {
            //if the item is let go outside of any container, it reverts back to where it was before the drag
            revertOnSpill:true,
            //horizontal ordering is being considered first (important at the stock's visual direction)
            direction:'horizontal',
            //set draggable items as movable by dragula
            moves: (el: Element, source: Element, handle: Element, sibling: Element) => {

                var element = this.findItem(+el.getAttribute("_id"));
                
                return element? element.draggable:true;
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

                return true;
            }


        });

        
    }
}