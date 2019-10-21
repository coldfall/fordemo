/**
 *
 * @author 
 *
 */
class ResultView extends eui.Component{
    private mark:eui.Image;
    
    private txtper:eui.Label;
    private btnshare: eui.Button;
    private btnagain: eui.Button;

    private sharemask:eui.Image;
    
    private r1: eui.Image;
    private r2: eui.Image;
    private r3: eui.Image;
    
    
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.uiLoaded,this);
        this.skinName = "resource/gameskins/FinalViewSkin.exml";


    }

    private uiLoaded(): void {

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }


    private onAddToStage(): void {
        this.sharemask.visible=false;
        this.sharemask.alpha=0;
        var per = Math.ceil(100 * CommonClass.myscore / 5000);
        if(per>=100){
            per=99;
        }
        this.txtper.text=per+"%";
        
        this.mark.alpha=0;
        var mys=CommonClass.myscore;
        var ch="";
        if(mys<2000){
            this.mark.source=RES.getRes("award_1_png");
            ch ="爱护眼小能手";
            TrackBaiduEvent("getch1");
        }else if(mys>=2000&&mys<3000){
            this.mark.source = RES.getRes("award_2_png");
            ch = "眼健康小卫士";
            TrackBaiduEvent("getch2");
        } else if(mys >= 3000) {
            this.mark.source = RES.getRes("award_3_png");
            ch = "视疲劳小战士";
            TrackBaiduEvent("getch3");
        } 
        
        
        this.mark.alpha = 0;

        this.alpha = 0;
        this.btnagain.alpha = 0;
        this.btnshare.alpha = 0;
        CommonClass.SetCenter(this.btnshare);
        CommonClass.SetCenter(this.btnagain);


        egret.Tween.get(this).to({ alpha: 1 },500).call(this.InitAni,this);
        SetWXShareWord(CommonClass.myscore,ch,this.txtper.text);
        
        
    }
    
    private InitAni(){
        egret.Tween.get(this.mark).to({ alpha: 1 },500);

        this.btnshare.scaleX = 0;
        this.btnshare.scaleY = 0;
        this.btnagain.scaleX = 0;
        this.btnagain.scaleY = 0;
        egret.Tween.get(this.btnshare).wait(300).to({ scaleX: 1,scaleY: 1,alpha: 1 },500,egret.Ease.backOut);
        egret.Tween.get(this.btnagain).wait(400).to({ scaleX: 1,scaleY: 1,alpha: 1 },500,egret.Ease.backOut);

        this.btnshare.addEventListener(egret.TouchEvent.TOUCH_END,this.onClickShare,this);
        this.btnagain.addEventListener(egret.TouchEvent.TOUCH_END,this.onClickAgain,this);
        this.sharemask.touchEnabled = true;
        this.sharemask.addEventListener(egret.TouchEvent.TOUCH_END,this.onClickShareMask,this);
        
    }
    
    private onClickShare() {
        this.sharemask.alpha = 0;
        this.sharemask.visible = true;
        egret.Tween.get(this.sharemask).to({ alpha: 1 },500);
    }

    private onClickAgain() {
       // this.stage.dispatchEvent(new GameEvent(GameEvent.GAMEAGAIN));
       location.href="../main/online.html";
    }
    
    private onClickShareMask(){
        var me=this;
        egret.Tween.get(this.sharemask).to({ alpha: 0 },500).call(function(){
            me.sharemask.visible=false;    
        },this);
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
