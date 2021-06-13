import { Directive, EventEmitter, HostListener, OnInit, Output, OnDestroy, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';

@Directive({
	selector: '[appDebounceClick]'
})
export class DebounceClickDirective implements OnInit, OnDestroy {
	@Input() debounceTime = 1000; // 时间参数，默认1秒
	@Input() throttleMillis = 1000; // 时间参数，默认1秒
	@Output() debounceClick = new EventEmitter();
	private clicks = new Subject<any>();
	private subscription!: Subscription;

	constructor() {}

	ngOnInit() {
		this.subscription = this.clicks
			.pipe(
				debounceTime(this.debounceTime), // 防抖
				throttleTime(this.throttleMillis) // 节流
			)
			.subscribe((e) => this.debounceClick.emit(e)); // 发射事件
	}

	ngOnDestroy() {
		this.subscription.unsubscribe(); // 取消订阅
	}

	// 绑定宿主事件
	@HostListener('click', ['$event'])
	clickEvent(event: any) {
		event.preventDefault();
		event.stopPropagation();
		this.clicks.next(event);
	}
}
