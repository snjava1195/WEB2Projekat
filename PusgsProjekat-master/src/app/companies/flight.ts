export class Flight{
    Id: Int16Array;
    DatumPoletanja: string;
    DatumSletanja: string;
    VremeTrajanjaLeta: string;
    DuzinaPutovanja: BigInt;
    BrojPresedanja: Int16Array;
    CenaBiznisKlase: BigInt;
    CenaEkonomskeKlase: BigInt;
    CenaPrveKlase: BigInt;
    MestoPoletanja: string;
    MestoSletanja: string;
    OcenaLeta: Int16Array;
    IdAvioKompanije: Int16Array;
    BrojSedista: Int16Array;
    
    from: string;
    to: string;
    time: string;
    price: number;

  /*  constructor(f: string, to: string, t: Date, p: number){
        this.from = f;
        this.to = to;
        this.time = t.toDateString() + ' ' + t.toTimeString().split('G')[0];
        this.price = p;    
    }*/
}