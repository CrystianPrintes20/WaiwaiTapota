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
  get baseURL() {
    return instanceApi.defaults.baseURL;
  }
  async palavrasMe(pageSize,currentPage) {
    let response = await instanceApi.get(
      `/palavras/me?limit=${pageSize}&page=${currentPage}`, 
      headersAuthorization(this.accessToken)
    );
    const bodyRes = response.data;
    return bodyRes;
  }
  async allPalavras(pageSize,currentPage) {
    let response = await instanceApi.get(
      `/palavras?limit=${pageSize}&page=${currentPage}`,
      headersAuthorization(this.accessToken)
    );
    const bodyRes = response.data;
    return bodyRes;
  }
  async updatePalavra(uid, data) {
    let response = await instanceApi.put(
      `/palavras/${uid}`,
      data,
      headersAuthorization(this.accessToken)
    );
    const bodyRes = response;
    return bodyRes;
  }
  async getByIdPalavra(uid) {
    let response = await instanceApi.get(
      `/palavras/${uid}`,
      headersAuthorization(this.accessToken)
    );
    const bodyRes = response.data;
    return bodyRes;
  }
  async createPalavra(data) {
    let response = await instanceApi.post(
      "/palavras/",
      data,
      headersAuthorization(this.accessToken)
    );
    const bodyRes = response;
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
    let response = await instanceApi.post(
      "/uploads/",
      data,
      headersAuthorization(this.accessToken, {
        "Content-Type": "multipart/form-data",
      })
    );
    const bodyRes = response.data;
    return bodyRes;
  }
  async deleteUpload(uuid) {
    let response = await instanceApi.delete(
      `/uploads/${uuid}`,
      headersAuthorization(this.accessToken, {
        "Content-Type": "multipart/form-data",
      })
    );
    const bodyRes = response.data;
    return bodyRes;
  }

  async allUsers(pageSize,currentPage) {
    let response = await instanceApi.get(
      `/usuarios?limit=${pageSize}&page=${currentPage}`,
      headersAuthorization(this.accessToken)
    );
    const bodyRes = response.data;
    return bodyRes;
  }

  async getByIdUser(uid) {
    let response = await instanceApi.get(
      `/usuarios/${uid}`,
      headersAuthorization(this.accessToken)
    );
    console.log("response",response)
    const bodyRes = response.data;
    return bodyRes;
  }
}
