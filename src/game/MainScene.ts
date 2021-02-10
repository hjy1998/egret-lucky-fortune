class MainScene extends eui.Component implements eui.UIComponent {

	public btnStart: eui.Group;
	public fortuneWheel: eui.Image;
	public wheel: eui.Group
	public tw: egret.Tween;
	public isPlaying = false;
	public buttonSound: egret.Sound = RES.getRes("button_mp3")

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);

	}

	protected childrenCreated(): void {
		super.childrenCreated();

		this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.spin, this)
	}

	public spin(e: egret.TouchEvent) {
		if (egret.getQualifiedClassName(e.target) === 'eui.Button') {
			this.buttonSound.play(2, 1);
		}
		let spinSound: egret.Sound = RES.getRes("spin_mp3");
		spinSound.play(0, 1);
		this.tw = egret.Tween.get(this.wheel);
		let rewards = this.randomPercentage();
		/**
		 * + 1080 can make the wheel rotate faster 
		 */
		this.tw.to({ rotation: rewards + 5 * 1080 }, 7000, egret.Ease.cubicInOut)
		this.tw.call(() => {
			if (rewards <= 60) {
				let emptySound: egret.Sound = RES.getRes("norewards_mp3");
				emptySound.play(0, 1);
			} else {
				let rewardSound: egret.Sound = RES.getRes("rewards_mp3");
				rewardSound.play(0, 1);
			}
		})

	}

	public randomPercentage(): number {
		var rewardPerentage = Math.random();

		if (rewardPerentage < 0.25) {
			return 60;
		} else if (rewardPerentage < 0.50) {
			return 180;
		} else if (rewardPerentage < 0.70) {
			return 240;
		} else if (rewardPerentage < 0.85) {
			return 300;
		} else if (rewardPerentage < 0.95) {
			return 360;
		} else {
			return 180;
		}

	}

}