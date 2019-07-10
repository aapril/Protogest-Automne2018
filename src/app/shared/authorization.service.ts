import { Injectable } from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute} from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

const headersDict = {
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
};

const userPool = new CognitoUserPool(environment.poolData);

@Injectable()
export class AuthorizationService {
  cognitoUser: any;

  constructor(private httpClient: HttpClient) { }

  register(email, password) {

    const attributeList = [];

    let dataEmail = {
        Name: 'email',
        Value: email
    };
    attributeList.push(new CognitoUserAttribute(dataEmail));

    return Observable.create(observer => {
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          console.log("signUp error", err);
          observer.error(err);
        }

        this.cognitoUser = result.user;
        console.log("signUp success", result);
        observer.next(result);
        observer.complete();
      });
    });

  }

  confirmAuthCode(code) {
    const user = {
      Username : this.cognitoUser.username,
      Pool : userPool
    };
    return Observable.create(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log("confirmAuthCode() success", result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  confirmAuthCodeWithUsername(code, username) {
    const user = {
      Username : username,
      Pool : userPool
    };
    return Observable.create(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log("confirmAuthCode() success", result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  signIn(email, password) { 

    const authenticationData = {
      Username : email,
      Password : password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username : email,
      Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);
    
    return Observable.create(observer => {

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          
          //console.log(result);
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err) {
          console.log(err);
          observer.error(err);
        },
      });
    });
  }

    setSessionDatabase(key): Observable<Event[]> {

        let allHeaders = Object.assign({}, headersDict, {'Authentification': key});

        const httpOptions = {
            headers: new HttpHeaders(allHeaders)
        };

        const protocole = {
            'session': {
            }};
        return this.httpClient.post<Event[]>(environment.backendUrl + '/store/session',protocole ,httpOptions).pipe(catchError((error:any) => {
            return throwError(error.statusText);
        }));
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
