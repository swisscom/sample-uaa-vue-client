/* eslint-disable */
import Oidc from 'oidc-client';
import 'babel-polyfill';

export default class SecurityService {

  constructor(config) {
    this.mgr = new Oidc.UserManager({
      userStore: new Oidc.WebStorageStateStore(),
      authority: config.oidc.authorizationEndpoint.substr(0, config.oidc.authorizationEndpoint.indexOf('/oauth')),
      client_id: config.oidc.clientId,
      redirect_uri: window.location.origin + '/static/callback.html',
      response_type: 'token',
      scope: 'openid roles',
      accessTokenExpiringNotificationTime: 10,
      filterProtocolClaims: true,
      automaticSilentRenew: false,
      loadUserInfo: false
    })

    Oidc.Log.logger = console;
    Oidc.Log.level = Oidc.Log.INFO;

    this.mgr.events.addUserLoaded(function (user) {
      console.log('New User Loaded：', arguments);
      console.log('Acess_token: ', user.access_token)
    });

    this.mgr.events.addAccessTokenExpiring(function () {
      console.log('AccessToken Expiring：', arguments);
    });

    this.mgr.events.addAccessTokenExpired(function () {
      console.log('AccessToken Expired：', arguments);
      alert('Session expired. Going out!');
      this.mgr.signoutRedirect().then(function (resp) {
        console.log('signed out', resp);
      }).catch(function (err) {
        console.log(err)
      })
    }.bind(this));

    this.mgr.events.addSilentRenewError(function () {
      console.error('Silent Renew Error：', arguments);
    });

    this.mgr.events.addUserSignedOut(function () {
      alert('Going out!');
      console.log('UserSignedOut：', arguments);
      this.mgr.signoutRedirect().then(function (resp) {
        console.log('signed out', resp);
      }).catch(function (err) {
        console.log(err)
      })
    }.bind(this));
  }

  // Get the user who is logged in
  getUser () {
    let self = this
    return new Promise((resolve, reject) => {
      this.mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(null)
        } else{
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Check if there is any user logged in
  getSignedIn () {
    let self = this
    return new Promise((resolve, reject) => {
      this.mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{
          return resolve(true)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Redirect of the current window to the authorization endpoint.
  signIn () {
    this.mgr.signinRedirect().catch(function (err) {
      console.log(err)
    })
  }

  // Redirect of the current window to the end session endpoint
  signOut () {
    this.mgr.signoutRedirect().then(function (resp) {
      console.log('signed out', resp);
    }).catch(function (err) {
      console.log(err)
    })
  }

  // Get the access token of the logged in user
  getAcessToken(){
    let self = this
    return new Promise((resolve, reject) => {
      this.mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(null)
        } else{
          return resolve(user.access_token)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

}
