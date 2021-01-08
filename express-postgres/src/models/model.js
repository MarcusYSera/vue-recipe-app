import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    const newArr = this.table.split('');
    newArr.pop();
    this.pKey = newArr.join('');
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }

  async insertWithReturn(columns, values) {
    const query = `
      INSERT INTO ${this.table}(${columns})
      VALUES (${values})
      RETURNING ${this.pKey}_id, ${columns}
    `;
    return this.pool.query(query);
  }

  async updateWithReturn(email, columns, values) {
    console.log(email);
    console.log(values);
    const query = `
      UPDATE ${this.table}
      SET ${values}
      WHERE email='${email}'
      RETURNING ${this.pKey}_id, ${columns}
    `;
    return this.pool.query(query);
  }
}

export default Model;
