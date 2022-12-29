import jwtDecode from "jwt-decode";

export class AuthToken {
    constructor(token) {
      this.token = token;
  
      this.decodedToken = {
        email: "",
        exp: 0
      };
  
      try {
        if (token) this.decodedToken = jwtDecode(token);
      } catch (e) {}
    }
  
    get expiresAt() {
      return new Date(this.decodedToken.exp * 1000);
    }
  
    get getExp(){
      return this.decodedToken.exp
    }

    get isExpired() {
      return new Date() > this.expiresAt;
    }
  
    get isAuthenticated() {
      return !this.isExpired;
    }
    get getUsername() {
        return this.decodedToken.sub;
      }
    get getEmail() {
        return this.decodedToken.email;
      }
  
    get authorizationString() {
      return `Bearer ${this.token}`;
    }
  
  }