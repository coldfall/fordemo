/**
 *
 * @author 
 *
 */
class RullView extends eui.Component{
    
    private btnstart:eui.Button;
    private r1: eui.Image;
    private r2: eui.Image;
    private r3: eui.Image;
    private rp: eui.Image;
    
	public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.uiLoaded,this);
        this.skinName = "resource/gameskins/RuleViewSkin.exml";


    }

    private uiLoaded(): void {

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    
    private onAddToStage(){
        this.alpha=0;
        this.btnstart.alpha=0;
        this.r1.alpha=0;
        this.r2.alpha = 0;
        this.r3.alpha = 0;
        this.rp.alpha = 0;
        
        CommonClass.SetCenter(this.btnstart);
 
        egret.Tween.get(this).to({alpha:1},500).call(this.InitAni,this);
        
    }
    
    private InitAni(){
        var me=this;
        
        egret.Tween.get(this.r1).to({ alpha: 0.6 },500);
        egret.Tween.get(this.r2).wait(200).to({ alpha: 0.3 },500);
        egret.Tween.get(this.r3).wait(300).to({ alpha: 1 },500);
        this.rp.y=164;
        this.btnstart.scaleX = 0;
        this.btnstart.scaleY = 0;
        egret.Tween.get(this.rp).wait(800).to({ y:214,alpha: 1 },300).call(function(){
            egret.Tween.get(me.btnstart).to({ scaleX: 1,scaleY: 1,alpha: 1 },500,egret.Ease.backOut);
        },this);

        
        this.btnstart.addEventListener(egret.TouchEvent.TOUCH_END,this.onClickStart,this);
        
    }
    
    private onClickStart(){
        var me=this;
        egret.Tween.removeAllTweens();
        egret.Tween.get(this).to({alpha:0},500).call(function(){
            me.stage.dispatchEvent(new GameEvent(GameEvent.SHOWGAME));
        },this);
        TrackBaiduEvent("startgame");
        
    }
    
    
    
    
    
}
