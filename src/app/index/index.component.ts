import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
	@ViewChild('canvas', { static: true })
	canvas!: ElementRef<HTMLCanvasElement>;
	private ctx!: CanvasRenderingContext2D;

	width: number = 0;
	canvasHeight: number = 120;
	curveAngleHeight: number = 40;
	startY: number = 60;
	nav: number = 0;

	//step1 动画属性
	step1: number = 0;
	step2: number = 0;
	start: boolean = false;
	click: boolean = false;
	trans: string = 'scale(1,1)';
	step3: number = 1;

	constructor(private router: Router) {}

	ngOnInit(): void {
		this.ctx = this.canvas.nativeElement.getContext('2d')!;
		this.width = Math.round(window.innerWidth);
		this.trans = `scale(${Math.round(this.width / 776) * 6},${Math.round(this.width / 776) * 1.1})`;
		this.drawInit(this.width);
	}

	onResize(): void {
		this.width = Math.round(window.innerWidth);
		this.drawInit(this.width);
	}

	drawInit(width: number): void {
		let middle = Math.round(width / 2);

		this.clear();
		this.ctx.canvas.width = width;
		this.ctx.canvas.height = this.canvasHeight;

		this.drawCurved(0, middle, middle - 56, middle - 50, middle - 150, 0);
		this.drawCurved(width, middle, middle + 56, middle + 50, middle + 150, 0);
	}

	drawCurved(width: number, middle: number, c1: number, c2: number, endPoint: number, index: number) {
		this.ctx.beginPath();
		this.ctx.moveTo(middle, this.curveAngleHeight + this.startY);
		this.ctx.bezierCurveTo(c1, this.curveAngleHeight + this.startY, c2, this.startY, endPoint, this.startY);
		this.ctx.lineTo(width, this.startY + index);
		this.ctx.lineTo(width, this.canvasHeight - index);
		this.ctx.bezierCurveTo(width, this.canvasHeight, middle, this.canvasHeight, middle, this.canvasHeight - index);
		this.ctx.closePath();
		this.ctx.fillStyle = 'white';
		this.ctx.fill();
	}

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.canvasHeight);
	}

	animation() {
		this.click = !this.click;
		if (this.click) return this.animationForword();

		this.start = false;
		setTimeout(() => {
			this.animationBackword();
		}, 250);
	}

	animationForword() {
		this.curveAngleHeight = 40;
		let middle = Math.round(this.width / 2);
		this.clear();

		if (this.step1 < 9) {
			this.drawCurved(0, middle, middle - 56, middle - 50, middle - 150, (10 / 8) * this.step1);
			this.drawCurved(this.width, middle, middle + 56, middle + 50, middle + 150, (10 / 8) * this.step1);
			window.requestAnimationFrame(() => this.animationForword());
		} else {
			this.start = true;
		}
		this.step1++;
		this.step2 = 0;
	}

	animationBackword() {
		let middle = Math.round(this.width / 2);
		this.step2++;

		if (this.step2 < 33) {
			this.clear();

			this.curveAngleHeight = this.curveAngleHeight - (160 / 30) * this.step3;

			if (this.curveAngleHeight < -40) {
				this.curveAngleHeight = -40;
				this.step3 = -1;
			} else if (this.curveAngleHeight > 40) {
				this.curveAngleHeight = 40;
				this.step3 = 1;
			}

			this.drawCurved(0, middle, middle - 56, middle - 50, middle - 150, 0);
			this.drawCurved(this.width, middle, middle + 56, middle + 50, middle + 150, 0);
			window.requestAnimationFrame(() => this.animationBackword());
		}
		this.step1 = 0;
	}

	left() {
		if (this.start) {
			this.nav = 3;
			this.animation();
			return;
		}
		this.router.navigate(['./index/category']);
		this.nav = 1;
	}

	right() {
		if (this.start) {
			this.nav = 4;
			return;
		}
		this.nav = 2;
	}
}
