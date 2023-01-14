import instanceApi from "./waiwaitapota.js";
import { TokenDecoder } from "./decoder.js";
import WaiwaiAuthentication from "./waiwaitapota.js";

/**
 *
 * @param {string} token - Refresh Token para atualizar o Access Token
 * @returns {string} Access Token atualizado
 */
export async function refreshAccessToken({ accessToken, refreshToken }) {
  try {
    const objAuth = new WaiwaiAuthentication(accessToken, refreshToken);
    const accessTokenRefreshed = await objAuth.refreshAccess();

    return accessTokenRefreshed;
  } catch (error) {
    console.log(error);
    return {
      accessToken,
      refreshToken,
      error: "RefreshAccessTokenError",
    };
  }
}
