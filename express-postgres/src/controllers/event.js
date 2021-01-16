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

// export const findAllEventsForUserById = async (req, res) => {
//   const {id} = req.params;
// };

export const addEventByUserId = async (req, res) => {
  const { userId } = req.params;
  const { eventName, eventTime, eventDate } = req.body;
  const columns = 'event_name, event_time, event_date';
  const values = `'${eventName}', '${eventTime}', '${eventDate}'`;
  try {
    const data = await eventModel.insertWithReturn(columns, values);
    res.status(200).json({ events: data.rows });
  } catch (err) {
    res.status(200).json({ events: err.stack });
  }
};
