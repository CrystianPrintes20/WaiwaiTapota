/**
 * @param {string} bt - Bearer Token
 * @returns {object} Objeto para cabeçalho
 */
export default function headersAuthorization(bt, nh = {}) {
  return {
    headers: {
      Authorization: `Bearer ${bt}`,
      "Content-Type": "application/json",
      ...nh,
    },
  };
}
