import Model from '../models/model';

const messagesModel = new Model('messages');

export const messagesPage = async (req, res) => {
  try {
    const data = await messagesModel.select('MESSAGE_ID, USER_FKID, MESSAGE');
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const addMessage = async (req, res) => {
  const { message, userId } = req.body;
  const columns = 'USER_FKID, MESSAGE';
  const values = `'${message}', '${userId}'`;
  try {
    const data = await messagesModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
