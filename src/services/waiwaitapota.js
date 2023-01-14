import axios from "axios";
import headersAuthorization from "../utils/headerBearer";

export const instanceApi = axios.create({
  baseURL: "http://localhost:5000",
});

export class WaiwaiAuthentication {
  /**
   * @param {string} accessToken
   * @param {string} refreshToken
   */
  constructor(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  /**
   * @returns {string} Access Token refreshed
   */
  async refreshAccess() {
    let response = await instanceApi.post(
      "/auth/refresh",
      {},
      headersAuthorization(this.refreshToken)
    );
    const bodyRes = response.data;
    this.accessToken = bodyRes.access_token;
    return this.accessToken;
  }

  async login() {}

  async logout() {}

  isAuthenticated() {}
}
