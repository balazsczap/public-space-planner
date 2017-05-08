import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StockItem } from '../../models/stock.model';
import { StockService } from '../../network/stock.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { AuthenticationService } from '../../auth/authentication.service';
import { Comment } from '../../models/comment.model';
import { FormControl, FormBuilder, FormGroup, Validators, Validator, AbstractControl } from '@angular/forms';
@Component({
  selector: 'stock-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
  private itemId: number;
  private item: StockItem;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private stockService: StockService,
    private notifications: NotificationsService,
    private auth: AuthenticationService) {

  }
  stockEditForm: FormGroup;



  ngOnInit() {
    this.stockEditForm = this.fb.group({
      "name": [""],
      "description": [""],
      "width": ['', Validators.required],
      "height": ['', Validators.required],
      "imgurl": ['', Validators.required]
    });
    this.route.params.subscribe(params => {
      this.itemId = +params['id'];
      this.stockService.getOneById(this.itemId)
        .subscribe(data => {
          this.item = data;
          this.stockEditForm.controls["name"].setValue(this.item.name);
          this.stockEditForm.controls["description"].setValue(this.item.description);
          this.stockEditForm.controls["width"].setValue(this.item.width);
          this.stockEditForm.controls["height"].setValue(this.item.height);
          this.stockEditForm.controls["imgurl"].setValue(this.item.imageUrl);
          if (this.item.creator.id != this.auth.user.id && this.auth.user.role != "admin") {
            this.router.navigate(["/404"]);
          }
        },
        err => {
          this.router.navigate(["/404"]);
        });
    });
  }

  onSubmit(formdata: any) {
    this.stockService.updateStockItem(this.itemId, formdata.name, formdata.description, formdata.width, formdata.height, formdata.imgurl)
      .subscribe(
      success => {
        if (success) {
          this.router.navigate(["../"], { relativeTo: this.route });
        }
      }
      )

  }




}
