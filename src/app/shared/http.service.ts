import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpBackendClient } from './http-interceptors/http-backend-client';

interface API {
	category: string;
	product: string;
	price: string;
}

@Injectable({
	providedIn: 'root'
})
export class AppHttpService {
	base: string = 'http://192.168.1.106:8080';
	api: API;

	constructor(private httpClient: HttpClient, private httpBackendClient: HttpBackendClient) {
		this.api = {
			category: `${this.base}/category/`,
			product: `${this.base}/product/getByCategory/`,
			price: `${this.base}/product/`
		};
	}

	test(bypass: boolean) {
		if (bypass) {
			return this.httpBackendClient.get('/api/test');
		} else {
			return this.httpClient.get('/api/test');
		}
	}

	simulateError() {
		return this.httpClient.get('/noop');
	}
}
