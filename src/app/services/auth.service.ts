import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    if (this.isBrowser()) {
      const token = localStorage.getItem('jwtToken'); // Access localStorage only in the browser
      this.isLoggedInSubject.next(!!token);
    }
  }

  // Observable to track login state
  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  // Login method to set the user as logged in
  login(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('jwtToken', token);
    }
    this.isLoggedInSubject.next(true);
  }

  // Logout method to clear user session
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('jwtToken');
    }
    this.isLoggedInSubject.next(false);
  }

  // Helper to check login state synchronously
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  // Helper method to detect if code is running in the browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
