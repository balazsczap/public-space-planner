import { DragulaService } from 'ng2-dragula';
import { Intersectable } from './intersectable.interface';

export class Grid<T extends Intersectable>{
    private map: Array<Array<Array<T>>> = [];
    private items: Array<T> = [];
    private dropSubscription: any;
    constructor(private dragulaService: DragulaService, private bagName: string, private cols: number, private rows: number) {
        //fill map with slots
        for (var i = 0; i < this.rows; ++i) {
            this.map.push([]);
            for (var j = 0; j < this.cols; ++j) {
                this.map[i].push([]);
            }
        }
        //on drop, set the current coordinates of the item
        this.dropSubscription = this.dragulaService.dropModel.subscribe(value => {
            //value is [bagName, element, target, source]

            var item = value[1];
            var [to_x, to_y] = [+value[2].getAttribute("x_pos"), +value[2].getAttribute("y_pos")];

            this.map[to_y][to_x][0].x = to_x;
            this.map[to_y][to_x][0].y = to_y;

        })
        this.dragulaService.setOptions(bagName, {
            over:(el:Element, container:Element, source:Element)=>{

            },
            moves: (el: Element, source: Element, handle: Element, sibling: Element) => {
                var element = this.map[+el.getAttribute("y_pos")][+el.getAttribute("x_pos")][0];
                return element.draggable;
            },
            //accepts is called by dragula to see if the element being dragged can be dropped in target
            accepts: (el: Element, target: Element, source: Element, sibling: Element) => {
                //if target is not part of the map
                if(target.classList.contains("map-item-container")){
                    return true;
                }

                //get the coordinates of the slots, which are stored as HTML attributes
                var [from_x, from_y] = [+source.getAttribute("x_pos"), +source.getAttribute("y_pos")];
                var [to_x, to_y] = [+target.getAttribute("x_pos"), +target.getAttribute("y_pos")];

                //if it's not being actually moved, it can be dropped
                if (from_x == to_x && from_y == to_y)
                    return true;

                var element;
                if(source.classList.contains("map-item-container")){
                    element = this.map[from_y][from_x][0];
                }
                else{
                    element = this.map[from_y][from_x][0];
                }

               

                //create a clone which can be tested for intersection with any other elements
                var tester = element.clone();
                tester.x = to_x;
                tester.y = to_y;
                //check for intersection with other elements
                for (var i = 0; i < this.items.length; ++i) {
                    if (tester.intersects(this.items[i]))
                        return false;
                }
                
                //check for intersection with the sides of the grid
                if (tester.x + tester.width > this.cols || tester.y + tester.height > this.rows) {
                    return false;
                }
                // return source.children.length<=1;
                return true;
            }


        });
    }
    public addItem(item: T, x: number, y: number) {
        this.map[y][x].push(item);
        this.items.push(item);
        item.x = x;
        item.y = y;
    }

    public getSlot(y: number, x: number) {
        return this.map[y][x];
    }
    public getItem(y: number, x: number) {
        if (this.map[y][x].length == 0) {
            return null;
        }
        return this.map[y][x][0];
    }

    public destoy(): void {
        this.dropSubscription.unsubscribe();

        this.dragulaService.destroy(this.bagName);
    }
}