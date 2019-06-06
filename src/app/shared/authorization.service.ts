import {Injectable} from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute} from 'amazon-cognito-identity-js';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {HttpClient} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import {SignupResponse} from '../signup/SignupResponse';


const userPool = new CognitoUserPool(environment.poolData);

@Injectable()
export class AuthorizationService {
    cognitoUser: any;

    constructor(
        private http: HttpClient,
    ) {
    }

    register(email, password) {

        const signupDataInfos = {
            'email': email,
            'password': password
            //TODO : TODOX: Ajouter informations du form ici
        };

        const signupResponse = this.http.post<SignupResponse>(environment.userApiUrl + '/register', signupDataInfos).pipe(
            catchError(this.handleSignupError)
        );



        return signupResponse;

    }

    private handleSignupError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }

    confirmAuthCode(code) {
        const user = {
            Username: this.cognitoUser.username,
            Pool: userPool
        };

        //TODO : TODOX : confirm on backend instead!
        const signupResponse = this.http.post<SignupResponse>(environment.userApiUrl + '/register', signupDataInfos).pipe(
            catchError(this.handleSignupError)
        );

        return Observable.create(observer => {
            const cognitoUser = new CognitoUser(user);
            cognitoUser.confirmRegistration(code, true, function (err, result) {
                if (err) {
                    console.log(err);
                    observer.error(err);
                }
                console.log('confirmAuthCode() success', result);
                observer.next(result);
                observer.complete();
            });
        });
    }

    confirmAuthCodeWithUsername(code, username) {
        const user = {
            Username: username,
            Pool: userPool
        };
        return Observable.create(observer => {
            const cognitoUser = new CognitoUser(user);
            cognitoUser.confirmRegistration(code, true, function (err, result) {
                if (err) {
                    console.log(err);
                    observer.error(err);
                }
                console.log('confirmAuthCode() success', result);
                observer.next(result);
                observer.complete();
            });
        });
    }

    signIn(email, password) {

        const authenticationData = {
            Username: email,
            Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        const userData = {
            Username: email,
            Pool: userPool
        };
        const cognitoUser = new CognitoUser(userData);

        return Observable.create(observer => {

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {

                    //console.log(result);
                    observer.next(result);
                    observer.complete();
                },
                onFailure: function (err) {
                    console.log(err);
                    observer.error(err);
                },
            });
        });
    }

    isLoggedIn() {
        return userPool.getCurrentUser() != null;
    }

    getAuthenticatedUser() {
        // gets the current user from the local storage
        return userPool.getCurrentUser();
    }

    logOut() {
        this.getAuthenticatedUser().signOut();
        this.cognitoUser = null;
    }
}
