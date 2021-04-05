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

// test authorization route

export const usersPage = async (req, res) => {
  try {
    const data = await usersModel.select('user_id, first_name, last_name, email');
    if (!req.body.user) return res.status(403).json({ error: true, message: 'Not logged In' });
    res.status(200).json({
      users: data.rows.filter((user) => user.user_id === req.body.user.user_id),
    });
  } catch (err) {
    res.status(400).json({ users: err.stack });
  }
};
