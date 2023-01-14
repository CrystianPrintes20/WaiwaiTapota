import jwtDecode from "jwt-decode";
import moment from "moment";

export class TokenDecoder {
  constructor(token) {
    this.token = token;

    this.decodedToken = {
      email: "",
      exp: 0,
    };

    try {
      if (token) this.decodedToken = jwtDecode(token);
    } catch (e) {}
  }

  get expiresAt() {
    return new Date(this.decodedToken.exp * 1000);
  }

  get getExp() {
    return this.decodedToken.exp;
  }

  get isExpired() {
    /**
     * Check if token is expired or not 20 minutes before expiration;
     */
    const event = new Date();
    return moment(event).add(20, "minutes") > this.expiresAt;
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
