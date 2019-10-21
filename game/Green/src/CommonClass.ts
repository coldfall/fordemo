/**
 *
 * @author 
 *
 */
class CommonClass {
    
    public static STATUSNORMAL:string="normal";
    public static STATUSHURRY: string = "hurry";
    public static STATUSFLY: string = "fly";
    public static STATUSFINAL: string = "final";
    
    
    public static myscore:number=0;
    public static singlescore:number=100;
    
    public static runspeed:number=8;
    public static flyspeed: number = 12;
    
    public static engame:boolean=false;
    
    public static guideplayed:boolean=false;
    
    
    
    
	public constructor() {
	}
	


    public static SetCenter(obj: egret.DisplayObject) {
        obj.anchorOffsetX = obj.width / 2;
        obj.anchorOffsetY = obj.height / 2;
        obj.x = obj.x + obj.width / 2;
        obj.y = obj.y + obj.height / 2;
    }
    
    public static GetRnd(n:number){
        return Math.ceil(n*Math.random());
    }
    
   
    
    
}
