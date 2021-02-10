var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this) || this;
        _this.isPlaying = false;
        _this.buttonSound = RES.getRes("button_mp3");
        return _this;
    }
    MainScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MainScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.spin, this);
    };
    MainScene.prototype.spin = function (e) {
        if (egret.getQualifiedClassName(e.target) === 'eui.Button') {
            this.buttonSound.play(2, 1);
        }
        var spinSound = RES.getRes("spin_mp3");
        spinSound.play(0, 1);
        this.tw = egret.Tween.get(this.wheel);
        var rewards = this.randomPercentage();
        /**
         * + 1080 can make the wheel rotate faster
         */
        this.tw.to({ rotation: rewards + 5 * 1080 }, 7000, egret.Ease.cubicInOut);
        this.tw.call(function () {
            if (rewards <= 60) {
                var emptySound = RES.getRes("norewards_mp3");
                emptySound.play(0, 1);
            }
            else {
                var rewardSound = RES.getRes("rewards_mp3");
                rewardSound.play(0, 1);
            }
        });
    };
    MainScene.prototype.randomPercentage = function () {
        var rewardPerentage = Math.random();
        if (rewardPerentage < 0.25) {
            return 60;
        }
        else if (rewardPerentage < 0.50) {
            return 180;
        }
        else if (rewardPerentage < 0.70) {
            return 240;
        }
        else if (rewardPerentage < 0.85) {
            return 300;
        }
        else if (rewardPerentage < 0.95) {
            return 360;
        }
        else {
            return 180;
        }
    };
    return MainScene;
}(eui.Component));
__reflect(MainScene.prototype, "MainScene", ["eui.UIComponent", "egret.DisplayObject"]);
