import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwtToken'); // Get the JWT token from localStorage

  if (req.url.includes('/login')) {
    return next(req); // Pass the request without modifying it
  }

  if (token) {
    // Clone the request to add the Authorization header
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req); // Pass the request to the next handler
};
