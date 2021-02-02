import Model from '../models/model.js';

const usersModel = new Model('users');

export const usersPage = async (req, res) => {
  try {
    const data = await usersModel.select('user_id, first_name, last_name, email, password');
    res.status(200).json({ users: data.rows });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};

export const findUserByEmail = async (req, res) => {
  const { email } = req.params;
  const columns = 'user_id, first_name, last_name, email, password';
  const clause = `WHERE email = '${email}'`;
  try {
    const data = await usersModel.select(columns, clause);
    res.status(200).json({ users: data.rows });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};

export const addUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const columns = 'first_name, last_name, email, password';
  const values = `'${firstName}', '${lastName}', '${email}', '${password}'`;

  try {
    const data = await usersModel.insertWithReturn(columns, values);
    res.status(200).json({ users: data.rows });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};

export const editUser = async (req, res) => {
  const { userId, firstName, lastName, email, password } = req.body;
  const { id } = req.params;
  const columns = 'user_id, first_name, last_name, email, password';
  const clause = `user_id = '${id}'`;
  const values = [];
  if (firstName) {
    values.push(`first_name = '${firstName}'`);
  }
  if (lastName) {
    values.push(`last_name = '${lastName}'`);
  }
  if (email) {
    values.push(clause);
  }
  if (password) {
    values.push(`password = '${password}'`);
  }
  try {
    const data = await usersModel.updateWithReturn(clause, columns, values.join(','));
    res.status(200).json({ users: data.rows });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};
