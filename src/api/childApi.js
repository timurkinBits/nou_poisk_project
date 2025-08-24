/** @typedef {Object} Child
  * @property {Number} id
  * @property {String} name
  * @property {String} surname
  * @property {String} fathersname
  * @property {"М"|"Ж"} gender
  * @property {String} grade
  * @property {String} birthdate
  * @property {String} study_place
  * @property {Boolean} is_first_time_in_nou
*/

const BASE_URL = 'http://localhost:8080/api/children';

export const ChildrenApi = {
  /** @returns {Promise<Child[]>} */
  async getChildren() {
    const response = await fetch(`${BASE_URL}/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  },
  async getChildrenById(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  },
};
