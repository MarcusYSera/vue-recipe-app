import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }

  async insertWithReturn(columns, values) {
    const newArr = this.table.split('');
    newArr.pop();
    const pKey = newArr.join('');
    const query = `
      INSERT INTO ${this.table}(${columns})
      VALUES (${values})
      RETURNING ${pKey}_id, ${columns}
    `;
    return this.pool.query(query);
  }

  async updateWithReturn(columns, values) {
    const query = `
      UPDATE ${this.table}
      SET (${values})
      WHERE email = ${values.email}
      RETURNING *
    `;
    return this.pool.query(query);
  }
}

export default Model;
