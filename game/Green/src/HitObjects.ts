/**
 *
 * @author 
 *
 */
class HitObjects extends eui.Image{
    
    public mytype:string;
    public enablehit:Boolean;
    
	public constructor(type:string) {
    	super();
    	this.mytype=type;
    	if(type=="drop"){
            this.source = RES.getRes("drop_png");
      } else if(type == "block1"){
            this.source = RES.getRes("block1_png");
        } else if(type == "block2") {
            this.source = RES.getRes("block2_png");
        }
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    	
	}
	
	
	private onAddToStage(e:egret.Event){
	    this.enablehit=true;
	}
	
}
