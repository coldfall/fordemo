/**
 *
 * @author 
 *
 */
class FailView extends eui.Component{
    
    private f1:eui.Image;
    private btnagain:eui.Button;
    
    
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.uiLoaded,this);
        this.skinName = "resource/gameskins/FailViewSkin.exml";


    }

    private uiLoaded(): void {

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }


    private onAddToStage(): void {
        this.alpha=0;
        this.btnagain.alpha=0;
        this.f1.alpha=0;
        var me=this;
        egret.Tween.get(this).to({alpha:1},500).call(function(){
              me.btnagain.y=456;
              egret.Tween.get(me.btnagain).to({y:406,alpha:1},500,egret.Ease.backOut);
              egret.Tween.get(me.f1).to({ alpha:1},500);
        },this);
        
        this.btnagain.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickAgain,this);
    }
    

    
    
    private onClickAgain() {
        this.stage.dispatchEvent(new GameEvent(GameEvent.GAMEAGAIN));
    }
    
    
}
