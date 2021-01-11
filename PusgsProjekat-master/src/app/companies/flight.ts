export class Flight{
    from: string;
    to: string;
    time: string;
    price: number;
  

    constructor(f: string, to: string, t: Date, p: number){
        this.from = f;
        this.to = to;
        this.time = t.toDateString() + ' ' + t.toTimeString().split('G')[0];
        this.price = p;    
    }
}