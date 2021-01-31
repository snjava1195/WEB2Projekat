export class BranchOffice{
    Id: Int16Array;
    RentaCarId: Int16Array;
    Name: string;
    Address: string;

    constructor(id: Int16Array, rcId: Int16Array, name: string, address: string){
        this.Id = id;
        this.RentaCarId = rcId;
        this.Name = name;
        this.Address = address;
    }


}