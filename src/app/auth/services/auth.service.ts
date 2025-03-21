import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { User } from '@auth/interfaces/user.interfaces';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {

    private _authStatus = signal('checking');
    private _user = signal<User | null>(null);
    private _token = signal<string | null>(localStorage.getItem('token'));


    private http = inject(HttpClient);
    private router = inject(Router)

    checkStatusResource = rxResource({
        loader: () => this.checkStatus()
    })


    authStatus = computed(() => {
        if (this._authStatus() === 'checking') return 'cheking';

        if (this._user()) {
            return 'authenticated';
        }
        return 'not-authenticated'
    });

    user = computed(() => this._user());
    token = computed(this._token);
    isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false );


    login(email: string, password: string): Observable<boolean> {
        return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
            email: email,
            password: password,
        }).pipe(
            map((resp) => this.handleAuthSuccess(resp) ),
            
            catchError((error: any) => this.handleAuthError(error))
        );
    }
    register(email: string, password: string, fullName: string): Observable<boolean> {
        return this.http.post<AuthResponse>(`${baseUrl}/auth/register`, {
            email: email,
            password: password,
            fullName: fullName
        }).pipe(
            map((resp) => this.handleAuthSuccess(resp) ),
            
            catchError((error: any) => this.handleAuthError(error))
        );
    }


    checkStatus(): Observable<boolean> {
        const token = localStorage.getItem('token');
        if (!token) {
          this.logout();
          return of(false);
        }
    
        return this.http
          .get<AuthResponse>(`${baseUrl}/auth/check-status`, {
            // headers: {
            //   Authorization: `Bearer ${token}`,
            // },
          })
          .pipe(
            map((resp) => this.handleAuthSuccess(resp)),
            catchError((error: any) => this.handleAuthError(error))
          );
      }

    logout() {
        this._user.set(null);
        this._token.set(null);
        this._authStatus.set('not-authenticated');

        localStorage.removeItem('token');

    }


    private handleAuthSuccess({ token, user }: AuthResponse) {
        this._user.set(user);
        this._authStatus.set('authenticated');
        this._token.set(token);


        localStorage.setItem('token', token);

        return true;
    }


    private handleAuthError(error: any){
        this.logout();
        return of(false);
    }
}