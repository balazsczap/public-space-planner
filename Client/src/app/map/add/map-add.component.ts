
import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula'
import { MapItem, Wall } from '../map-item.model';
import { Grid } from '../grid/grid';

@Component({
  selector: 'app-map-add',
  templateUrl: './map-add.component.html',
  styleUrls: ['./map-add.component.less'],
})

export class MapAddComponent implements OnInit {
    private items: Array<MapItem> = [];

    private box_width=50;
    constructor(private dragulaService: DragulaService) {
        
    }

    ngOnInit(){
        this.items.push(new MapItem(1,1,"#0000ff"));
        this.items.push(new MapItem(1,2,"#00ffff"));
    }
}