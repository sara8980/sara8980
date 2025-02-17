export default class userModel{
    Name!:string
    Id!:string
    Email!:string
    Phone!:string
    Password!:string
    UserType!:string
    
   
    constructor(Name:string,Id:string,Email:string,Phone:string,Password:string,UserType:string){

        this.Name=Name;
        this.Id=Id; 
        this.Email=Email; 
        this.Phone=Phone; 
        this.Password=Password
        this.UserType=UserType;
        
     

    }
}