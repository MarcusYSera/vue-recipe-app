import Model from '../models/model';

const usersModel = new Model('users');

export const usersPage = async (req, res) => {
  try {
    const data = await usersModel.select('first_name, last_name, email, password');
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
  const { firstName, lastName, email, password } = req.body;
  const columns = 'first_name, last_name, email, password';
  const values = [];
  if (firstName) {
    values.push(`first_name = ${firstName}`);
  }
  if (lastName) {
    values.push(`last_name = ${lastName}`);
  }
  if (email) {
    values.push(`email = ${email}`);
  }
  if (password) {
    values.push(`password = ${password}`);
  }
  if (values[1]) {
    values.join(',');
  }
  try {
    const data = await usersModel.updateWithReturn(columns, values);
    res.status(200).json({ users: data.rows });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};