
export class Car{
    Id: Int16Array;
    RentaCarId: Int16Array;
    Name: string;
    Rate: number;
    Price: number;
    RatedBy: number;

    constructor(id: Int16Array, rci: Int16Array, n :string, p: number )
    {
        this.Name = n;
        this.Id =id;
        this.RentaCarId = rci;
        this.Price = p;
    }
}