/**
 *
 * @author 
 *
 */
class Monster extends eui.Image{
	public constructor() {
    	super();
    	this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	
	
	private onAddToStage(e:egret.Event){
	    this.source=RES.getRes("monster_png");
	    console.log("addmonster");
	}
	
}
