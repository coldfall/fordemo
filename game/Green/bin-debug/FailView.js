/**
 *
 * @author
 *
 */
var FailView = (function (_super) {
    __extends(FailView, _super);
    function FailView() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiLoaded, this);
        this.skinName = "resource/gameskins/FailViewSkin.exml";
    }
    var d = __define,c=FailView,p=c.prototype;
    p.uiLoaded = function () {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    };
    p.onAddToStage = function () {
        this.alpha = 0;
        this.btnagain.alpha = 0;
        this.f1.alpha = 0;
        var me = this;
        egret.Tween.get(this).to({ alpha: 1 }, 500).call(function () {
            me.btnagain.y = 456;
            egret.Tween.get(me.btnagain).to({ y: 406, alpha: 1 }, 500, egret.Ease.backOut);
            egret.Tween.get(me.f1).to({ alpha: 1 }, 500);
        }, this);
        this.btnagain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickAgain, this);
    };
    p.onClickAgain = function () {
        this.stage.dispatchEvent(new GameEvent(GameEvent.GAMEAGAIN));
    };
    return FailView;
}(eui.Component));
egret.registerClass(FailView,'FailView');
