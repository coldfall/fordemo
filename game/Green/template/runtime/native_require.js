
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/wxbaidu/wxbaidu.js",
	"libs/jquery.min.js",
	"libs/weixin.js",
	"libs/baidu.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/CommonClass.js",
	"bin-debug/FailView.js",
	"bin-debug/FinishFailView.js",
	"bin-debug/FinishView.js",
	"bin-debug/GameEvents.js",
	"bin-debug/GameView.js",
	"bin-debug/HitObjects.js",
	"bin-debug/HitWords.js",
	"bin-debug/IndexView.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/Monster.js",
	"bin-debug/ResultView.js",
	"bin-debug/RullView.js",
	"bin-debug/RunJie.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/WaterImg.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "noBorder",
		contentWidth: 1138,
		contentHeight: 640,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};