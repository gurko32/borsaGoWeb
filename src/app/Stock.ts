export class Stock {
  constructor(
    public rate: number,
    public lastprice: number,
    public lastpricestr: string,
    public hacim: number,
    public hacimstr: string,
    public min: number,
    public minstr: string,
    public max: number,
    public maxstr: string,
    public time: Date,
    public text: string,
    public code: string
  ) {}
}
