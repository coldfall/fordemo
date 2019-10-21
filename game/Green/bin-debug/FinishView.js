/**
 *
 * @author
 *
 */
var FinishView = (function (_super) {
    __extends(FinishView, _super);
    function FinishView() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiLoaded, this);
        this.skinName = "resource/gameskins/FinishViewSkin.exml";
    }
    var d = __define,c=FinishView,p=c.prototype;
    p.uiLoaded = function () {
        this.onAddToStage();
    };
    p.onAddToStage = function () {
        CommonClass.SetCenter(this.r1);
        CommonClass.SetCenter(this.r2);
        CommonClass.SetCenter(this.r3);
        this.float.alpha = 0;
        this.bg.alpha = 0;
        this.light.alpha = 0;
        this.f1.alpha = 0;
        this.f2.alpha = 0;
        this.f1.x = -120;
        this.f2.x = 680;
        this.r1.scaleX = 0;
        this.r1.scaleY = 0;
        this.r1.alpha = 0.4;
        this.r2.scaleX = 0;
        this.r2.scaleY = 0;
        this.r2.alpha = 0.2;
        this.r3.scaleX = 0;
        this.r3.scaleY = 0;
        this.r3.alpha = 1;
        var me = this;
        egret.Tween.get(this.light).to({ alpha: 1 }, 500).call(function () {
            egret.Tween.get(me.bg).to({ alpha: 1 }, 10);
            egret.Tween.get(me.light).to({ alpha: 0 }, 500).call(function () {
                egret.Tween.get(me.r1).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
                egret.Tween.get(me.r2).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
                egret.Tween.get(me.r3).wait(500).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 500, egret.Ease.backOut).call(me.onShowFloat, me);
            }, me);
        }, this);
    };
    p.onShowFloat = function () {
        var me = this;
        egret.Tween.get(this.f1).to({ x: 78, alpha: 1 }, 500, egret.Ease.backOut);
        egret.Tween.get(this.f2).to({ x: 480, alpha: 1 }, 500, egret.Ease.backOut).call(function () {
            egret.Tween.get(me.float).wait(1000).to({ alpha: 1 }, 500).call(function () {
                setTimeout(function () {
                    egret.Tween.get(me.light).to({ alpha: 1 }, 500).call(function () {
                        me.stage.dispatchEvent(new GameEvent(GameEvent.SHOWRESULT));
                    }, me);
                }, 1000);
            }, me);
        }, this);
    };
    return FinishView;
}(eui.Component));
egret.registerClass(FinishView,'FinishView');
