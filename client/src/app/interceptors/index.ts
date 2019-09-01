/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpHeadersInterceptor } from './http.headers.interceptor';

/** Http interceptor providers in outside-in order */
export const Interceptors = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptor, multi: true },
];
