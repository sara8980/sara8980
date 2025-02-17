export default class eventModel{
    code_costomer!:String
    event_code!:string
    event_name!:string
    the_date!:Date
    was_invited!:boolean

   
    constructor(code_costomer:string, event_code:string,event_name:string,the_date:Date){
        this.code_costomer=code_costomer; 
        this.event_code=event_code; 
        this.event_name=event_name;
        this.the_date=the_date; 
        this.was_invited=false; 
    }
}