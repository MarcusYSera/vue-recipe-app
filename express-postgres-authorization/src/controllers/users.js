import Model from './../models/model.js';

const usersModel = new Model('users');

export const findUserByEmail = async (req, res) => {
  const { email } = req.params;
  const columns = 'email';
  const clause = `WHERE email = '${email}'`;
  try {
    const data = await usersModel.select(columns, clause);
    res.status(200).json({ users: data.rows });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};

export const createUser = async (req, res) => {
  console.log(req.body);
  let values = '';
  let columns = [];
  for (const [key, value] of Object.entries(req.body)) {
    columns.push(key);
    if (values.length === 0) {
      values = `'${value}'`;
    } else {
      values += `, '${value}'`;
    }
  }
  columns = columns.join(', ');
  try {
    const data = await usersModel.insertWithReturn(columns, values);
    res.status(200).json({ users: data.rows });
  } catch (err) {
    res.status(406).json({ users: err.stack, message: 'DataBase Error' });
  }
};

// test authorization route

export const usersPage = async (req, res) => {
  try {
    const data = await usersModel.select('user_id, first_name, last_name, email');
    if (!req.user) return;
    res.status(200).json({
      users: data.rows.filter((user) => user.user_id === req.user.user_id),
    });
  } catch (err) {
    res.status(400).json({ users: err.stack });
  }
};
