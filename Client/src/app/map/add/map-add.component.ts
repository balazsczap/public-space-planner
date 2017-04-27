
import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula'
import { MapItem, Wall } from '../map-item.model';
import { Grid } from '../grid/grid';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map-add',
  templateUrl: './map-add.component.html',
  styleUrls: ['./map-add.component.less'],
})

export class MapAddComponent implements OnInit {
    private box_width=50;
    constructor(private mapService: MapService<MapItem>) {
        
    }

    ngOnInit(){

    }
}