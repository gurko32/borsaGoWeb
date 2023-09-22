import {Component, OnInit, AfterViewInit} from '@angular/core';

import { Stock } from './Stock';
import { generateDummyStockData } from './stock-data.service'; // Adjust the path as needed
import { ApiService } from './api.service';
import { Subject } from 'rxjs';


//declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{

  numberOfStocksToGenerate = 10;
  stocks: Stock[] = generateDummyStockData(this.numberOfStocksToGenerate);

  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching:true,
      //  paging:false
      lengthChange:false
    };
  }

  ngAfterViewInit(): void{
    this.loadDataTableData2();
  }

  onSubmit() {
    console.log('yogatttaaa arigatoo');
    this.loadDataTableData2();
  }

  loadDataTableData2(): void {

    console.log('1');
    this.stocks = generateDummyStockData(this.numberOfStocksToGenerate);
    console.log(this.stocks);
    this.dtTrigger.next(null);

    // $("#dataTable").rows( {page: 'current'} ).delete();;
    // this.dataTable.fnAddData(this.stocks);
    // this.dataTable.draw();
    //this.initializeDatatable();
  }

  loadDataTableData(): void {
    this.apiService.getData().subscribe(
      (data: Stock[]) => {
        this.stocks = data;
        //this.initializeDatatable();
        this.dtTrigger.next(null);

      },
      (error) => {
        console.error('API request error:', error);
      }
    );
  }
}