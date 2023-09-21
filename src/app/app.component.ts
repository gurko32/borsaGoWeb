import {Component, OnInit} from '@angular/core';

import { Stock } from './Stock';
import { generateDummyStockData } from './stock-data.service'; // Adjust the path as needed
import { ApiService } from './api.service';


declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  dataTable: any;

  numberOfStocksToGenerate = 10;
  stocks: Stock[] = generateDummyStockData(this.numberOfStocksToGenerate);

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.initializeDatatable();
  }
  private initializeDatatable() {
    this.dataTable = $("#dataTable");
    this.dataTable.DataTable();
  }

  onSubmit() {
    console.log('yogatttaaa arigatoo');
    this.loadDataTableData2();
  }

  loadDataTableData2(): void {
    console.log('1');
    this.stocks = generateDummyStockData(this.numberOfStocksToGenerate);
    console.log(this.stocks);
    $("#dataTable").rows( {page: 'current'} ).delete();;
    this.dataTable.fnAddData(this.stocks);
    this.dataTable.draw();
    //this.initializeDatatable();
  }

  loadDataTableData(): void {
    this.apiService.getData().subscribe(
      (data: Stock[]) => {
        this.stocks = data;
        this.initializeDatatable();
      },
      (error) => {
        console.error('API request error:', error);
      }
    );
  }
}