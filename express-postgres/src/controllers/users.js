import Model from '../models/model';

const usersModel = new Model('users');

export const usersPage = async (req, res) => {
  try {
    const data = await usersModel.select('first_name, last_name, email, password');
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const addUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const columns = 'firstName, lastName, email, password';
  const values = `'${firstName}', '${lastName}', '${email}', '${password}'`;
  try {
    const data = await usersModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
