/**
 *
 * @author 
 *
 */
class FinishFailView extends eui.Component{
    private r1:eui.Image;
    private r2: eui.Image;
    private r3: eui.Image;
    private f1: eui.Image;
    private f2: eui.Image;
    
    private light: eui.Rect;
    private float: eui.Image;
    private bg: eui.Image;

    
	public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.uiLoaded,this);
        this.skinName = "resource/gameskins/FinishFailViewSkin.exml";


    }

    private uiLoaded(): void {
        CommonClass.SetCenter(this.r1);
        CommonClass.SetCenter(this.r2);
        CommonClass.SetCenter(this.r3);
        this.onAddToStage();
    }

    private onAddToStage() {
        
        console.log(this.stage);
        
        this.float.alpha = 0;
        this.bg.alpha = 0;
        this.light.alpha=0;

        
        this.f1.alpha=0;
        this.f2.alpha=0;
        this.f1.x=500;
        this.f2.x = -100;
        
        this.r1.scaleX = 0;
        this.r1.scaleY = 0;
        this.r1.alpha = 0.4;

        this.r2.scaleX = 0;
        this.r2.scaleY = 0;
        this.r2.alpha = 0.2;

        this.r3.scaleX = 0;
        this.r3.scaleY = 0;
        this.r3.alpha = 1;

        
        var me=this;
        
        egret.Tween.get(this.light).to({alpha:1},500).call(function(){
            egret.Tween.get(me.bg).to({ alpha: 1 },10);  
            
            egret.Tween.get(me.light).to({ alpha: 0 },500).call(function() {
                egret.Tween.get(me.r1).to({ scaleX: 1,scaleY: 1 },500,egret.Ease.backOut);
                egret.Tween.get(me.r2).to({ scaleX: 1,scaleY: 1 },500,egret.Ease.backOut);
                egret.Tween.get(me.r3).wait(500).to({ scaleX: 1,scaleY: 1,alpha: 1 },500,egret.Ease.backOut).call(me.onShowFloat,me);
        

            },me);
            
        },this);

        
	}
	
	private onShowFloat(){
        var me = this;
        egret.Tween.get(this.f1).to({ x: 412,alpha:1 },500,egret.Ease.backOut);
        egret.Tween.get(this.f2).to({ x:0,alpha: 1 },500).call(function(){
            egret.Tween.get(me.float).wait(1000).to({ alpha:1},500).call(function(){

                setTimeout(function() {
                    egret.Tween.get(me.light).to({ alpha: 1 },500).call(function() {
                        me.stage.dispatchEvent(new GameEvent(GameEvent.SHOWFAIL));
                    },me);
                },1000);
            },me);

    
        },this);

	}
	
	
	
	
}
