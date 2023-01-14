/**
 * @param {string} bt - Bearer Token
 * @returns {object} Objeto para cabeçalho
 */
export default function headersAuthorization(bt) {
  return {
    headers: {
      Authorization: `Bearer ${bt}`,
      "content-type": "application/json",
    },
  };
}
