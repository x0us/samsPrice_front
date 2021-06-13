import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private _snackBar: MatSnackBar) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				let userFacingErrorMessage;

				if (this.isClientSideError(error)) {
					userFacingErrorMessage = `A client-side or network error occurred: ${error.message}`;
				} else {
					userFacingErrorMessage = `A backend error occurred: ${error.status}, ${error.message}`;
				}

				this._snackBar.open('PizzaPartyComponent', 'string', { duration: 3000 });

				return throwError(error);
			})
		);
	}

	private isClientSideError(error: HttpErrorResponse) {
		return error instanceof ErrorEvent;
	}
}
