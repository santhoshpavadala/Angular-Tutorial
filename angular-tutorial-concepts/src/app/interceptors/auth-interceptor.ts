import { HttpHeaders, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   let token="4567abcd"

//   let interceptReq = req.clone({
//     method: 'GET', // We can change the methods of inspect elements network request headers
//     body: { product: "Interceptor body" }, // we can also change the request respose body also
//     headers: new HttpHeaders(
//       {
//         Authorization: `Bearer ${token}`
//       }
//     )
//   })
//   console.log("Request Interceptor initiated");
  
//   return next(interceptReq).pipe(
//     tap(
//       (data)=>{
//         if(data instanceof HttpResponse)
//         console.log(data);
//       }
//     ),

//     catchError(
//       (err)=>{
//         if(err.status==404) {
//           console.log("Page Not Found");
//         }
//         return throwError("Invalid URL")
//       }
//     )
//   );
// };



export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = "4567abcd";

  const interceptReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log("Request Interceptor initiated");

  return next(interceptReq).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        console.log("Response received:", event.body);
      }
    }),
    catchError((err) => {
      if (err.status === 404) {
        console.log("Page Not Found");
      }
      return throwError(() => err);
    })
  );
};