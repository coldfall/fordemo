/**
 *
 * @author
 *
 */
var IndexView = (function (_super) {
    __extends(IndexView, _super);
    function IndexView() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiLoaded, this);
        this.skinName = "resource/gameskins/StartViewSkin.exml";
    }
    var d = __define,c=IndexView,p=c.prototype;
    p.uiLoaded = function () {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    };
    p.onAddToStage = function () {
        CommonClass.SetCenter(this.r1);
        CommonClass.SetCenter(this.r2);
        CommonClass.SetCenter(this.r3);
        CommonClass.SetCenter(this.rbig);
        this.r1.scaleX = 0;
        this.r1.scaleY = 0;
        this.r1.alpha = 0.6;
        this.r2.scaleX = 0;
        this.r2.scaleY = 0;
        this.r2.alpha = 0.2;
        this.r2.rotation = 90;
        this.r3.scaleX = 0;
        this.r3.scaleY = 0;
        this.r3.alpha = 0.5;
        this.r3.rotation = -65;
        this.rbig.alpha = 1;
        this.rbig.scaleX = 0;
        this.rbig.scaleY = 0;
        this.ani1.alpha = 0;
        this.ani2.alpha = 0;
        this.ani3.alpha = 0;
        this.ani4.alpha = 0;
        this.ani4.scaleX = 0;
        this.ani4.scaleY = 0;
        CommonClass.SetCenter(this.ani4);
        CommonClass.SetCenter(this.word1);
        this.word1.alpha = 0;
        this.word1.scaleX = 0;
        this.word1.scaleY = 0;
        this.alpha = 0;
        egret.Tween.get(this).to({ alpha: 1 }, 500).call(this.IndexAni, this);
        TrackBaiduEvent("startview");
    };
    p.IndexAni = function () {
        egret.Tween.get(this.r1).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        egret.Tween.get(this.r2).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        egret.Tween.get(this.r3).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        egret.Tween.get(this.rbig).wait(200).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 500, egret.Ease.backOut).call(this.Anis, this);
    };
    p.Anis = function () {
        var me = this;
        var cnter = 0;
        var shinetimer;
        egret.Tween.get(this.ani1).to({ alpha: 1 }, 500);
        egret.Tween.get(this.word1).wait(500).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 1000, egret.Ease.elasticOut).call(function () {
            egret.Tween.get(this.word1).wait(1500).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 500, egret.Ease.backIn);
            egret.Tween.get(this.ani1).wait(1500).to({ alpha: 0 }, 500).call(function () {
                me.ani3.x = 159;
                egret.Tween.get(me.ani3).to({ x: 189, alpha: 1 }, 300).call(function () {
                }, me);
                me.ani2.y = 337;
                egret.Tween.get(me.ani2).wait(600).to({ y: 317, alpha: 1 }, 300).call(function () {
                    me.ani4.alpha = 1;
                    egret.Tween.get(me.ani4).wait(500).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 1000, egret.Ease.elasticOut).call(function () {
                        me.onAniEnd();
                    }, me);
                }, me);
            }, me);
        }, this);
    };
    p.onAniEnd = function () {
        this.ShowGame();
    };
    p.ShowGame = function () {
        egret.Tween.removeAllTweens();
        var me = this;
        setTimeout(function () {
            me.stage.dispatchEvent(new GameEvent(GameEvent.SHOWGAME));
        }, 1000);
    };
    return IndexView;
}(eui.Component));
egret.registerClass(IndexView,'IndexView');
