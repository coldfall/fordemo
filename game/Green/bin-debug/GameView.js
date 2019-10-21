/**
 *
 * @author
 *
 */
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.call(this);
        this.roadcnt = 0;
        this.singlewidth = 1884;
        this.totaltime = 60;
        this.movespeed = 0;
        this.destspeed = 8;
        this.initx = 101;
        this.iniroadx = 1150;
        this.roadmaps = [1, 1, 0, 2, 1, 0, 3, 1, 0, 1, 0, 2, 0, 3, 0, 2, 0, 3, 0, 1, 0, 1, 0, 3, 0, 2, 0, 1, 1, 0, 2, 1, 0, 3, 2, 0, 0, 3, 2, 1, 0, 2, 2, 0, 3, 3, 0, 2, 2, 3, 3, 1, 0, 2, 2, 0, 2, 3, 3, 0, 1, 1, 2, 2, 1, 3, 0, 1];
        this.rwidth = 500;
        this.acctime = 3;
        this.lasty = 0;
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiLoaded, this);
        this.skinName = "resource/gameskins/GameViewSkin.exml";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=GameView,p=c.prototype;
    p.uiLoaded = function () {
    };
    p.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.InitUI();
        this.InitGame();
        this.msk.touchEnabled = false;
        this.alpha = 0;
        egret.Tween.get(this).to({ alpha: 1 }, 500).call(this.StartGuide, this);
    };
    p.InitUI = function () {
        this.guides.visible = true;
        this.guide1.alpha = 0;
        this.guide1.visible = false;
        this.btnNext.alpha = 0;
        this.btnNext.visible = false;
        this.btnNext2.alpha = 0;
        this.btnNext2.visible = false;
        this.guide2.alpha = 0;
        this.guide2.visible = false;
        this.guide3.alpha = 0;
        this.guide3.visible = false;
        this.btnGo.alpha = 0;
        this.btnGo.visible = false;
        this.btnSkip.alpha = 0;
        this.btnSkip.visible = false;
        CommonClass.myscore = 0;
        this.txtscore.text = CommonClass.myscore + "";
        this.txtscore.x = 896 + (130 - this.txtscore.textWidth) / 2;
        this.imgend1.alpha = 0;
        this.imgend1.scaleX = 0;
        this.imgend1.scaleY = 0;
        this.imgend1.visible = false;
        this.imgend2.alpha = 0;
        this.imgend2.visible = false;
        CommonClass.SetCenter(this.imgend2);
        //this.msk.visible=false;
    };
    p.SetScore = function (num) {
        CommonClass.myscore = num;
        this.txtscore.text = CommonClass.myscore + "";
        this.txtscore.x = 896 + (130 - this.txtscore.textWidth) / 2;
    };
    p.InitGame = function () {
        console.log("InitGame");
        egret.Tween.removeAllTweens();
        this.curtime = this.totaltime;
        this.SetTime();
    };
    p.SetTime = function () {
        this.timebar.scaleX = this.curtime / this.totaltime;
    };
    p.StartGuide = function () {
        if (CommonClass.guideplayed == false) {
            this.guides.visible = true;
            this.guide1.visible = true;
            this.guide1.alpha = 0;
            this.btnNext.visible = true;
            this.btnSkip.alpha = 0;
            this.btnSkip.visible = true;
            egret.Tween.get(this.guide1).to({ alpha: 1 }, 500);
            egret.Tween.get(this.btnNext).to({ alpha: 1 }, 500);
            egret.Tween.get(this.btnSkip).to({ alpha: 1 }, 500);
            this.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickNext, this);
            this.btnSkip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSkip, this);
        }
        else {
            this.StartNow();
        }
    };
    p.onClickNext = function () {
        var me = this;
        egret.Tween.get(this.guide1).to({ alpha: 0 }, 500);
        egret.Tween.get(this.btnNext).to({ alpha: 0 }, 500).call(function () {
            me.guide1.visible = false;
            me.btnNext.visible = false;
            me.guide2.visible = true;
            me.guide2.alpha = 0;
            me.btnNext2.visible = true;
            egret.Tween.get(me.guide2).to({ alpha: 1 }, 500);
            egret.Tween.get(me.btnNext2).to({ alpha: 1 }, 500);
            me.btnNext2.addEventListener(egret.TouchEvent.TOUCH_TAP, me.onClickNext2, me);
        }, this);
    };
    p.onClickNext2 = function () {
        var me = this;
        egret.Tween.get(this.btnSkip).to({ alpha: 0 }, 500);
        egret.Tween.get(this.guide2).to({ alpha: 0 }, 500);
        egret.Tween.get(this.btnNext2).to({ alpha: 0 }, 500).call(function () {
            me.guide2.visible = false;
            me.btnNext2.visible = false;
            me.btnSkip.visible = false;
            me.guide3.visible = true;
            me.guide3.alpha = 0;
            me.btnGo.visible = true;
            egret.Tween.get(me.guide3).to({ alpha: 1 }, 500);
            egret.Tween.get(me.btnGo).to({ alpha: 1 }, 500);
            me.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, me.onClickSkip, me);
        }, this);
    };
    p.onClickSkip = function () {
        if (this.guide1.alpha > 0) {
            egret.Tween.get(this.guide1).to({ alpha: 0 }, 500);
            egret.Tween.get(this.btnNext).to({ alpha: 0 }, 500).call(this.StartNow, this);
        }
        else if (this.guide2.alpha > 0) {
            egret.Tween.get(this.guide2).to({ alpha: 0 }, 500);
            egret.Tween.get(this.btnNext2).to({ alpha: 0 }, 500).call(this.StartNow, this);
        }
        else if (this.guide3.alpha > 0) {
            egret.Tween.get(this.guide3).to({ alpha: 0 }, 500);
            egret.Tween.get(this.btnGo).to({ alpha: 0 }, 500).call(this.StartNow, this);
        }
    };
    p.StartNow = function () {
        console.log("StartNow");
        this.guides.visible = false;
        CommonClass.guideplayed = true;
        CommonClass.engame = true;
        this.acctime = 3;
        this.imgleft.source = RES.getRes("num" + this.acctime + "_png");
        this.InitRoad();
        this.InitChars();
        this.InitControl();
        this.hint.alpha = 0;
        this.hint.scaleX = 0;
        this.hint.scaleY = 0;
        this.curtime = this.totaltime;
        this.gametimer = new egret.Timer(1000, 0);
        this.gametimer.addEventListener(egret.TimerEvent.TIMER, this.onGameTime, this);
        this.gametimer.start();
    };
    p.InitRoad = function () {
        this.destspeed = CommonClass.runspeed;
        this.roadcnt = 0;
        this.roads.x = this.initx;
        this.roadbgs.removeChildren();
        this.roadassets.removeChildren();
        this.bgfar.removeChildren();
        this.bgfar.x = 0;
        for (var i = 0; i < 20; i++) {
            this.AddOneRoad(i);
        }
        this.AddAssets();
        this.movetimer = new egret.Timer(10, 0);
        this.movetimer.addEventListener(egret.TimerEvent.TIMER, this.onMove, this);
        this.movetimer.start();
    };
    p.AddOneRoad = function (n) {
        this.roadcnt++;
        var roadimg = new eui.Image();
        roadimg.source = RES.getRes("bgroadfront_png");
        roadimg.x = (this.roadcnt - 1) * this.singlewidth;
        this.roadbgs.addChild(roadimg);
        var farimg = new eui.Image();
        farimg.source = RES.getRes("bgroad_jpg");
        farimg.x = (this.roadcnt - 1) * this.singlewidth;
        this.bgfar.addChild(farimg);
    };
    p.AddAssets = function () {
        var curx = 0;
        for (var i = 0; i < this.roadmaps.length; i++) {
            curx = this.iniroadx + i * this.rwidth;
            var n = this.roadmaps[i];
            if (n > 0) {
                if (n == 1) {
                    this.AddOneAsset1(curx);
                }
                else if (n == 2) {
                    this.AddOneAsset2(curx);
                }
                else if (n == 3) {
                    this.AddOneAsset3(curx);
                }
            }
        }
    };
    p.AddOneAsset1 = function (stx) {
        var pos = [[163, 128], [242, 128], [163, 209], [242, 209]];
        for (var i = 0; i < pos.length; i++) {
            var drop = new HitObjects("drop");
            drop.x = stx + pos[i][0];
            drop.y = pos[i][1];
            this.roadassets.addChild(drop);
        }
    };
    p.AddOneAsset2 = function (stx) {
        var pos = [[29, 209], [79, 137], [151, 84], [235, 56], [316, 84], [392, 137], [436, 209]];
        var posblock = [183, 215];
        for (var i = 0; i < pos.length; i++) {
            var drop = new HitObjects("drop");
            drop.x = stx + pos[i][0];
            drop.y = pos[i][1];
            this.roadassets.addChild(drop);
        }
        var block = new HitObjects("block1");
        block.x = stx + posblock[0];
        block.y = posblock[1];
        this.roadassets.addChild(block);
    };
    p.AddOneAsset3 = function (stx) {
        var pos = [[29, 209], [79, 137], [151, 84], [235, 56], [316, 84], [392, 137], [436, 209]];
        var posblock = [183, 215];
        for (var i = 0; i < pos.length; i++) {
            var drop = new HitObjects("drop");
            drop.x = stx + pos[i][0];
            drop.y = pos[i][1];
            this.roadassets.addChild(drop);
        }
        var block = new HitObjects("block2");
        block.x = stx + posblock[0];
        block.y = posblock[1];
        this.roadassets.addChild(block);
    };
    p.onMove = function () {
        if (CommonClass.engame) {
            this.roads.x -= this.movespeed;
            this.bgfar.x -= this.movespeed * 0.5;
            if (this.movespeed > this.destspeed) {
                this.movespeed--;
            }
            else if (this.movespeed < this.destspeed) {
                this.movespeed++;
            }
            this.CheckHit();
        }
    };
    p.InitChars = function () {
        this.chars.removeChildren();
        this.charmonster = new Monster();
        this.charmonster.x = -250;
        this.charmonster.y = 152;
        this.chars.addChild(this.charmonster);
        this.charrunjie = new RunJie();
        this.charrunjie.x = 107;
        this.charrunjie.y = 212;
        this.chars.addChild(this.charrunjie);
    };
    p.CheckHit = function () {
        if (this.charrunjie.enablecheck) {
            for (var i = 0; i < this.roadassets.numChildren; i++) {
                var ho = this.roadassets.getChildAt(i);
                if (ho.x + this.roads.x >= 0 && ho.x + this.roads.x <= 1138) {
                    if (ho.enablehit) {
                        // var rc: egret.Point = new egret.Point(this.charrunjie.x + 61 + this.charrunjie.width,this.charrunjie.y + 141 + this.charrunjie.height / 2);
                        var rt = new egret.Point(this.charrunjie.x + 61 + this.charrunjie.width, this.charrunjie.y + 141);
                        var cet = new egret.Point(this.charrunjie.x + 101 + this.charrunjie.width / 2, this.charrunjie.y + this.charrunjie.height / 2 + 141);
                        var rb = new egret.Point(this.charrunjie.x + 61 + this.charrunjie.width, this.charrunjie.y + 141 + this.charrunjie.height);
                        if (ho.hitTestPoint(rt.x, rt.y, false) || ho.hitTestPoint(cet.x, cet.y, false)) {
                            console.log("hit");
                            if (ho.mytype == "drop") {
                                var me = this;
                                ho.enablehit = false;
                                egret.Tween.get(ho).to({ y: -50, x: ho.x + 800 }, 700).call(function (obj) {
                                    me.roadassets.removeChild(obj);
                                }, this, [ho]);
                                this.SetScore(CommonClass.myscore + CommonClass.singlescore);
                                var rnd = Math.ceil(20 * Math.random());
                                if (rnd == 1) {
                                    this.ShowHint();
                                }
                            }
                            else if (ho.mytype == "block1" || ho.mytype == "block2") {
                                var me = this;
                                this.charrunjie.enablecheck = false;
                                if (this.charrunjie.status == CommonClass.STATUSNORMAL) {
                                    this.charrunjie.SetStatus(CommonClass.STATUSHURRY);
                                    this.charrunjie.Fall();
                                    this.movespeed = 0;
                                    setTimeout(function () {
                                        me.charrunjie.enablecheck = true;
                                    }, 500);
                                    egret.Tween.get(this.charmonster).to({ x: -23 }, 500).call(function () {
                                        setTimeout(function () {
                                            console.log(me.charrunjie.status);
                                            if (me.charrunjie.status == CommonClass.STATUSHURRY && CommonClass.engame) {
                                                me.charrunjie.SetStatus(CommonClass.STATUSNORMAL);
                                                egret.Tween.get(me.charmonster).to({ x: -250 }, 500);
                                            }
                                        }, 5000);
                                    }, this);
                                }
                                else if (this.charrunjie.status == CommonClass.STATUSHURRY) {
                                    this.ShowFail();
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    p.InitControl = function () {
        this.msk.touchEnabled = true;
        this.msk.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTDown, this);
        this.msk.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTMove, this);
        this.msk.addEventListener(egret.TouchEvent.TOUCH_END, this.onTUp, this);
        CommonClass.SetCenter(this.btnacc);
        this.btnacc.touchEnabled = false;
        this.btnacc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickAcc, this);
    };
    p.onClickAcc = function () {
        if (CommonClass.engame) {
            var me = this;
            if (this.acctime > 0 && (this.charrunjie.status == CommonClass.STATUSNORMAL || this.charrunjie.status == CommonClass.STATUSHURRY)) {
                if (this.charrunjie.status == CommonClass.STATUSHURRY) {
                    egret.Tween.get(me.charmonster).to({ x: -250 }, 500);
                }
                this.acctime--;
                this.imgleft.source = RES.getRes("num" + this.acctime + "_png");
                if (this.acctime <= 0) {
                    this.btnacc.touchEnabled = false;
                    egret.Tween.get(this.btnacc).wait(500).to({ scaleX: 0, scaleY: 0 }, 500).call(function () {
                        me.btnacc.visible = false;
                    }, this);
                }
                this.charrunjie.SetStatus(CommonClass.STATUSFLY);
                this.charrunjie.y = 71;
                this.flytimer = new egret.Timer(4000, 1);
                this.flytimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onFlyEnd, this);
                this.flytimer.start();
                this.destspeed = CommonClass.flyspeed;
            }
        }
    };
    p.onFlyEnd = function () {
        this.charrunjie.SetStatus(CommonClass.STATUSNORMAL);
        this.charrunjie.y = 212;
        this.charrunjie.enablecheck = true;
        this.destspeed = CommonClass.runspeed;
    };
    p.onTDown = function (e) {
        if (this.charrunjie.status == CommonClass.STATUSFLY) {
            this.lasty = e.stageY - 141;
        }
        else {
            if (this.charrunjie.isjumping == false) {
                if (this.charrunjie.status == CommonClass.STATUSNORMAL || this.charrunjie.status == CommonClass.STATUSHURRY) {
                    var me = this;
                    this.charrunjie.isjumping = true;
                    this.charrunjie.Jump();
                    egret.Tween.get(this.charrunjie).to({ y: 2 }, 400, egret.Ease.sineOut).call(function () {
                        egret.Tween.get(me.charrunjie).to({ y: 212 }, 400, egret.Ease.sineIn).call(function () {
                            me.charrunjie.isjumping = false;
                        }, me);
                    }, this);
                }
            }
        }
    };
    p.onTMove = function (e) {
        if (this.charrunjie.status == CommonClass.STATUSFLY) {
            var ty = e.stageY - 141;
            this.charrunjie.y += (ty - this.lasty) / 3;
            if (this.charrunjie.y < 0) {
                this.charrunjie.y = 0;
            }
            if (this.charrunjie.y > 150) {
                this.charrunjie.y = 150;
            }
            this.lasty = ty;
        }
    };
    p.onTUp = function (e) {
    };
    p.ShowHint = function () {
        if (this.hint.scaleX == 0) {
            var me = this;
            egret.Tween.get(this.hint).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 500, egret.Ease.backOut).call(function () {
                egret.Tween.get(me.hint).wait(3000).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 500, egret.Ease.backIn).call(function () {
                }, this);
            }, this);
        }
    };
    p.ShowFail = function () {
        this.destspeed = 0;
        var me = this;
        this.charrunjie.SetStatus(CommonClass.STATUSHURRY);
        egret.Tween.get(me.charmonster).to({ x: 20 }, 500);
        if (this.movetimer) {
            this.movetimer.stop();
            this.movetimer = null;
        }
        if (this.gametimer) {
            this.gametimer.stop();
            this.gametimer = null;
        }
        if (this.hurrytimer) {
            this.hurrytimer.stop();
            this.hurrytimer = null;
        }
        setTimeout(function () {
            console.log("fail");
            CommonClass.engame = false;
            me.stage.dispatchEvent(new GameEvent(GameEvent.SHOWFAIL));
            me.roadassets.removeChildren();
        }, 1000);
        TrackBaiduEvent("Fail");
    };
    p.onGameTime = function () {
        if (CommonClass.engame) {
            this.curtime--;
            this.SetTime();
            if (this.curtime <= 0) {
                this.SetEnd();
            }
        }
    };
    p.SetEnd = function () {
        console.log("SetEnd");
        this.gametimer.stop();
        this.gametimer = null;
        this.charrunjie.SetStatus(CommonClass.STATUSFINAL);
        this.charrunjie.enablecheck = false;
        this.imgendbuilding = new eui.Image();
        this.imgendbuilding.source = RES.getRes("imgend3_png");
        this.imgendbuilding.y = 18;
        this.imgendbuilding.x = -1 * this.roads.x + 1138;
        var me = this;
        egret.Tween.get(this.charmonster).to({ alpha: 0 }, 500);
        egret.Tween.get(this.roadassets).to({ alpha: 0 }, 300).call(function () {
            me.roadassets.removeChildren();
            me.roadassets.addChild(me.imgendbuilding);
            me.roadassets.alpha = 1;
            setTimeout(function () {
                CommonClass.engame = false;
                me.EndMov();
            }, 1500);
        }, this);
    };
    p.EndMov = function () {
        var me = this;
        egret.Tween.get(this.charrunjie).to({ x: 409, alpha: 0 }, 500).call(function () {
            me.imgend1.visible = true;
            me.imgend2.visible = true;
            egret.Tween.get(me.imgend1).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 500, egret.Ease.backOut);
            egret.Tween.get(me.imgend2).to({ alpha: 1 }, 500).call(function () {
                egret.Tween.get(me.imgend2, { loop: true }).to({ rotation: 360 }, 4000);
            }, me);
            setTimeout(function () {
                me.ShowFinish();
            }, 2000);
        }, this);
    };
    p.ShowFinish = function () {
        console.log("FINISH");
        if (CommonClass.myscore < 1000) {
            TrackBaiduEvent("Fail");
            this.stage.dispatchEvent(new GameEvent(GameEvent.SHOWFAIL));
        }
        else {
            TrackBaiduEvent("Win");
            this.stage.dispatchEvent(new GameEvent(GameEvent.SHOWRESULT));
        }
    };
    return GameView;
}(eui.Component));
egret.registerClass(GameView,'GameView');
