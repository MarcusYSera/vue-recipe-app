import Model from '../models/model.js';

const eventsModel = new Model('events');

export const eventsPage = async (req, res) => {
  try {
    const data = await eventsModel.select(
      'user_fkid, event_name, event_date, event_start_end'
    );
    res.status(200).json({ events: data.rows });
  } catch (err) {
    res.status(200).json({ events: err.stack });
  }
};

export const findEventsById = async (req, res) => {
  const { id } = req.params;
  const columns = 'event_name, event_date, event_start_end';
  const clause = `WHERE user_fkid = ${id}`;
  try {
    const data = await eventsModel.select(columns, clause);
    res.status(200).json({ events: data.rows });
  } catch (err) {
    res.status(200).json({ events: err.stack });
  }
};

export const addEventByUserId = async (req, res) => {
  const { id } = req.params;
  const { event_name, event_date, event_start_end } = req.body;
  // console.log(req.body);
  const columns = 'USER_FKID, EVENT_NAME, EVENT_DATE, EVENT_START_END';
  const values = `'${id}','${event_name}', '${event_date}', '${event_start_end}'`;
  try {
    const data = await eventsModel.insertWithReturn(columns, values);
    res.status(200).json({ events: data.rows });
  } catch (err) {
    console.warn(err);
    res.status(200).json({ events: err.stack });
  }
};
