/**
 *
 * @author 
 *
 */
class HitWords extends eui.Component{
    
    private img:eui.Image;
	public constructor() {
    	
    	super();
    	this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    	
	}
	
	private onAddToStage(){
        var n=CommonClass.GetRnd(5);
    	  
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.img=new eui.Image();
        this.img.texture = RES.getRes("hitword"+n+"_png");

        this.img.x=-361;
        this.img.y=-89;
        this.addChild(this.img);
        this.alpha=0;
        this.scaleX=0;
        this.scaleY=0;
        
        this.touchEnabled=false;
        this.touchChildren=false;
        var me=this;
        egret.Tween.get(this).to({scaleX:1,scaleY:1, alpha: 1 },300,egret.Ease.backOut).call(function(){
            egret.Tween.get(me).wait(300).to({ alpha: 0},300).call(me.onE,me);
        },this);
        
	}
	
	private onE(){
        this.visible = false;
	    this.parent.removeChild(this);
	    
	}
	
}
