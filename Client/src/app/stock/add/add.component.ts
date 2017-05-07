import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators, Validator, AbstractControl } from '@angular/forms';
import { StockService } from '../..//network/stock.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {
  stockAddForm: FormGroup;
  constructor(private fb: FormBuilder,
    private stockService: StockService,
    private router: Router) { }

  ngOnInit() {
    this.stockAddForm = this.fb.group({
      "name": ['', Validators.required],
      "description": [""],
      "width": ['', Validators.required],
      "height": ['', Validators.required],
      "imgurl": ['', Validators.required]
    });

  }

  onSubmit(value) {
    this.stockService.createStockItem(value.name, value.description, value.width, value.height, value.imgurl)
      .subscribe(
      success => {
        if (success) {
          this.router.navigate(["/stock"]);
        }
      }
      )
  }

}
