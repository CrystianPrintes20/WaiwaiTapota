import { instanceApi } from "./waiwaitapota";
import headersAuthorization from "../utils/headerBearer";

export default class connectionWaiwai {
  /**
   * @param {string} accessToken
   */
  constructor(accessToken) {
    this.accessToken = accessToken;
  }
  /**
   *
   * @returns {object} Palavras cadastradas pelo usuário
   */
  async palavrasMe() {
    let response = await instanceApi.get(
      "/palavras/me",
      headersAuthorization(this.accessToken)
    );
    const bodyRes = response.data;
    return bodyRes;
  }
  async allPalavras() {
    let response = await instanceApi.get(
      "/palavras",
      headersAuthorization(this.accessToken)
    );
    const bodyRes = response.data;
    return bodyRes;
  }
  async createPalavra(data) {
    let response = await instanceApi.post(
      "/palavras",
      data,
      headersAuthorization(this.accessToken)
    );
    const bodyRes = response.data;
    return bodyRes;
  }
  async deletePalavra(uid) {
    let response = await instanceApi.delete(
      `/palavras/${uid}`,
      headersAuthorization(this.accessToken)
    );
    const bodyRes = response.data;
    return bodyRes;
  }

  async createUpload(data) {
    let response = await instanceApi.post("/uploads/", data, {
      "Content-Type": "multipart/form-data",
    });
    const bodyRes = response.data;
    return bodyRes;
  }

  async uploadAudio(data) {
    let response = await instanceApi.post("/uploads/", data, {
      "Content-Type": "multipart/form-data",
    });
    const bodyRes = response.data;
    return bodyRes;
  }
}
