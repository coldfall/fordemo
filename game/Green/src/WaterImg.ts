/**
 *
 * @author 
 *
 */
class WaterImg extends eui.Component{
    
    private img:eui.Image;
	public constructor() {
    	
    	super();
    	this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    	
	}
	
	private onAddToStage(){
    	  
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.img=new eui.Image();
        this.img.texture=RES.getRes("water1_png");

        this.img.x=-189;
        this.img.y=-93;
        this.addChild(this.img);
        this.alpha=1;
        
        this.touchEnabled=false;
        this.touchChildren=false;
        
        var me=this;
        setTimeout(function(){
            me.img.texture = RES.getRes("water2_png");
            me.img.x = -149;
            me.img.y = -83;
            egret.Tween.get(me).to({ alpha: 0 },500).call(me.onE,me);
        },100);
        
	}
	
	private onE(){
        this.visible = false;
	    this.parent.removeChild(this);
	    
	}
	
}
