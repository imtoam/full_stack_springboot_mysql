const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

class TokenStorageService { 
    signOut(){
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.removeItem(TOKEN_KEY);
    }
  
    saveToken(token) {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
  
    getToken() {
      return window.sessionStorage.getItem(TOKEN_KEY);
    }
  
    saveUser(user) {
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  
    getUser() {
      var user = window.sessionStorage.getItem(USER_KEY);
      if(user !== null){
        return JSON.parse(user);
      }
      else{
        return null;
      }
    }
}
  
export default new TokenStorageService();