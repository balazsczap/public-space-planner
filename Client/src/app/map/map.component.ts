import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula'
import { MapItem, Wall } from './map-item.model';
import { StockItem } from '../models/stock.model';
import { ConcreteMapService } from './concrete.map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less'],
})
export class MapComponent implements OnInit {
  private rows: number;
  private rowIndexes;
  private cols: number;
  private colIndexes;

  private box_width;

  private loaded = false;

  private hideStock: boolean = true;
  // @ViewChild('myname') input; 
  constructor(private mapService: ConcreteMapService) {
    this.rows = mapService.getRows();
    this.cols = mapService.getCols();
    this.rowIndexes = (Array(this.rows).fill(0).map((x, i) => i));
    this.colIndexes = (Array(this.cols).fill(0).map((x, i) => i));
    mapService.reload();
    mapService.loadingFinished.subscribe(value=>{
      this.loaded=value;
    })
  }

  onResize(div: ClientRect) {
    this.box_width = Math.ceil(div.width / this.cols);
  }

  ngOnInit() {

    window.dispatchEvent(new Event("resize"));
  }

  getItem(row: number, col: number): MapItem {
    return this.mapService.getItemFromMap(row, col);
  }

  getSlot(row: number, col: number) {
    return this.mapService.getSlot(row, col);
  }

  ngOnDestroy() {
    // this.mapService.reload();
  }

  hide() {
    this.hideStock = !this.hideStock;
  }

  save() {
    this.mapService.save();
  }

}
