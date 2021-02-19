import Model from '../models/model.js';

const eventsModel = new Model('events');

export const eventsPage = async (req, res) => {
  try {
    const data = await eventsModel.select(
      'user_fkid, event_name, event_associate_recipe, event_description, event_date, event_start_end, event_duration'
    );
    res.status(200).json({ events: data.rows });
  } catch (err) {
    res.status(200).json({ events: err.stack });
  }
};

export const findEventsByIdAndDate = async (req, res) => {
  const { id, date } = req.params;
  // console.log(id);
  // console.log(date);
  const columns =
    'event_name, event_associate_recipe, event_description, event_date, event_start_end, event_duration';
  const clause = `WHERE user_fkid = ${id} AND event_date::date = date '${date}'`;
  try {
    const data = await eventsModel.select(columns, clause);
    res.status(200).json({ events: data.rows });
  } catch (err) {
    res.status(200).json({ events: err.stack });
  }
};

export const addEventByUserId = async (req, res) => {
  const { id } = req.params;
  const {
    event_name,
    event_associate_recipe,
    event_description,
    event_date,
    event_start_end,
    event_duration,
  } = req.body;
  // console.log(req.body);
  const columns =
    'USER_FKID, EVENT_NAME, EVENT_ASSOCIATE_RECIPE, EVENT_DESCRIPTION, EVENT_DATE, EVENT_START_END, EVENT_DURATION';
  const values = `'${id}','${event_name}', '${event_associate_recipe}','${event_description}', '${event_date}', '${event_start_end}', '${event_duration}'`;
  try {
    const data = await eventsModel.insertWithReturn(columns, values);
    res.status(200).json({ events: data.rows });
  } catch (err) {
    // console.log(err);
    console.warn(err);
    res.status(200).json({ events: err.stack });
  }
};
