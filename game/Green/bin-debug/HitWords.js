/**
 *
 * @author
 *
 */
var HitWords = (function (_super) {
    __extends(HitWords, _super);
    function HitWords() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=HitWords,p=c.prototype;
    p.onAddToStage = function () {
        var n = CommonClass.GetRnd(5);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.img = new eui.Image();
        this.img.texture = RES.getRes("hitword" + n + "_png");
        this.img.x = -361;
        this.img.y = -89;
        this.addChild(this.img);
        this.alpha = 0;
        this.scaleX = 0;
        this.scaleY = 0;
        this.touchEnabled = false;
        this.touchChildren = false;
        var me = this;
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 300, egret.Ease.backOut).call(function () {
            egret.Tween.get(me).wait(300).to({ alpha: 0 }, 300).call(me.onE, me);
        }, this);
    };
    p.onE = function () {
        this.visible = false;
        this.parent.removeChild(this);
    };
    return HitWords;
}(eui.Component));
egret.registerClass(HitWords,'HitWords');
