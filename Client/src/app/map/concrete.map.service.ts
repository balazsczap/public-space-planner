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
import { UserService } from "app/network/user.service";
@Injectable()
export class ConcreteMapService extends MapService<MapItem> {
    constructor(dragulaService: DragulaService,
        stockService: StockService,
        httpService: HttpService<string>,
        authService: AuthenticationService,
        notificationsService: NotificationsService, userService: UserService) {
        super(dragulaService, stockService, httpService, authService, notificationsService, userService);



        
        this.dragulaSetup();


    }

    public reload() {
        this.init();


        for (var i = 0; i < 20; ++i) {
            this.addItemToMap(new Wall(2, 1), 20 - i - 1, Math.floor(i * 1.35));
        }
        for (var i = 0; i < 20; ++i) {
            for (var j = 0; j < 34; ++j) {
                if ((i == 0 || i == 19) && j > 0 && j < 33) {
                    this.addItemToMap(new Wall(1, 1), i, j);
                }
                else if (j == 0 || j == 33) {
                    this.addItemToMap(new Wall(1, 1), i, j);
                }

            }
        }
    }

    public load(){
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
    }

    public loadOther(map:string){
        this.stockService.getAllAsMapItems().subscribe(value => {
            this.originalStock = value;
            this.stock = value;

            if (map.length > 2) {
                this.loadFromString(map);

            }
            else {
                // this.init
            }


        });
    }

}