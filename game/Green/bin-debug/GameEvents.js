var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=GameEvent,p=c.prototype;
    GameEvent.SHOWRULE = "showrule";
    GameEvent.SHOWGAME = "showgame";
    GameEvent.SHOWFINISHFAIL = "showfinishfail";
    GameEvent.SHOWFINISHRESULT = "showfinishresult";
    GameEvent.SHOWRESULT = "showresult";
    GameEvent.SHOWFAIL = "showfail";
    GameEvent.GAMEAGAIN = "gameagain";
    GameEvent.ADDSCORE = "addscore";
    GameEvent.NEXTSTAGE = "nextstage";
    return GameEvent;
}(egret.Event));
egret.registerClass(GameEvent,'GameEvent');
