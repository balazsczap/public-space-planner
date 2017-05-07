import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { DragulaService } from "ng2-dragula";
import { Intersectable, Wall, MapItem } from './map-item.model';
import { HttpService } from '../network/http.service';
import { StockService } from '../network/stock.service';
import { AuthenticationService } from '../auth/authentication.service';
import { User } from '../models/user.model';
// import { StockItem } from '../models/stock.model';
import { NotificationsService } from '../notifications/notifications.service';
import { MapService } from './map.service';
@Injectable()
export class ConcreteMapService extends MapService<MapItem> {
    constructor(dragulaService: DragulaService,
        stockService: StockService,
        httpService: HttpService<string>,
        authService: AuthenticationService,
        notificationsService: NotificationsService) {
        super(dragulaService, stockService, httpService, authService, notificationsService);



        this.dragulaSetup();


    }

    public reload(){
        this.init();
        
        this.stockService.getAllAsMapItems().subscribe(value => {
            this.originalStock = value;
            this.stock = value;
            this.httpService.get(`/users/${this.authService._userId}/plan`)
                .map(data => {
                    return data.text();
                })
                .subscribe(
                (plan: string) => {
                    if (plan.length > 2) {
                        this.loadFromString(plan);

                    }
                    else {
                        // this.init
                    }

                },
                err => {
                    this.notificationsService.createDefaultError(err);
                    //fill map with slots


            });
        });
        this.addItemToMap(new Wall(2, 8), 0, 6);
        this.addItemToMap(new Wall(7, 2), 3, 11);

        this.addItemToMap(new Wall(2, 1), 0, 16);
        this.addItemToMap(new Wall(1, 1), 1, 17);
        this.addItemToMap(new Wall(1, 1), 6, 17);
        this.addItemToMap(new Wall(2, 1), 7, 16);

        this.addItemToMap(new Wall(2, 1), 0, 0);
        this.addItemToMap(new Wall(1, 1), 1, 0);
        this.addItemToMap(new Wall(1, 1), 6, 0);
        this.addItemToMap(new Wall(2, 1), 7, 0);

    }

}