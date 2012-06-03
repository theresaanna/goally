// code taken with slight alteration from https://gist.github.com/2863869 after irc 
// discussion and trying out some other node libraries, etc.
// clear that a Meteor specific solution would be best

var require = __meteor_bootstrap__.require;
var OAuth= require('oauth').OAuth;
var oauth = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  // token
  // secret
  '1.0',
  'http://goally.me/authCallback',
  'HMAC-SHA1'
);

Meteor.methods({
  auth: function() {
    debugger;
    this.unblock();

    var future = new Future;
    callback = function(error, oauth_token, oauth_token_secret, results) {
      future.ret({
        error: error,
        oauth_token: oauth_token,
        oauth_token_secret: oauth_token_secret,
        results: results
      });
    };
    callback = _.once(callback);

    oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
      callback(error, oauth_token, oauth_token_secret, results)
    });

    if(future) {
      return future.wait();
    }
  },

  authCallback: function(oauth_token, oauth_verifier) {
    this.unblock();

    var future = new Future;
    callback = function(error, oauth_access_token, oauth_access_token_secret, results) {
      future.ret({
        error: error,
        oauth_access_token: oauth_access_token,
        oauth_access_token_secret: oauth_access_token_secret,
        results: results
      });
    };
    callback = _.once(callback);

    oauth.getOAuthAccessToken(
      oauth_token,
      null,
      oauth_verifier, 
      function(error, oauth_access_token, oauth_access_token_secret, results) {
        callback(error, oauth_access_token, oauth_access_token_secret, results);
      }
    );

    if(future) {
      return future.wait();
    }    
  }

});
