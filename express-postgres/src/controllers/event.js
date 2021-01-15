import Model from '../models/model';

const eventModel = new Model('event');

export const eventPage = async (req, res) => {
  try {
    const data = await eventModel.select('');
    res.status(200).json({ events: data.rows });
  } catch (err) {
    res.status(200).json({ events: err.stack });
  }
};
