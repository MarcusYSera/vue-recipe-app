import Model from '../models/model.js';

const usersModel = new Model('users');

export const editUser = async (req, res) => {
  let values = '';
  let columns = [];
  for (const [key, value] of Object.entries(req.body)) {
    columns.push(key);
    if (values.length === 0) {
      values = `${key} = '${value}'`;
    } else {
      values += `,${key} = '${value}'`;
    }
  }
  columns = columns.join(', ');
  const { id } = req.params;
  const clause = `user_id = '${id}'`;
  try {
    const data = await usersModel.updateWithReturn(clause, columns, values);
    res.status(200).json({ users: data.rows });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};
