import Model from '../models/model';

const messagesModel = new Model('messages');

export const messagesPage = async (req, res) => {
  try {
    const data = await messagesModel.select('message_id, message, user_id');
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const addMessage = async (req, res) => {
  const { message, user_id } = req.body;
  const columns = 'message, user_id';
  const values = `'${message}', '${user_id}'`;
  try {
    const data = await messagesModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
