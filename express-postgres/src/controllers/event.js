import Model from '../models/model.js';
const eventsModel = new Model('events');

export const eventsPage = async (req, res) => {
  try {
    const data = await eventsModel.select(
      'user_id, event_name, event_associate_recipe, event_description, event_start, event_end, event_duration'
    );
    res
      .status(200)
      .json({ events: data.rows.filter((event) => event.user_id === req.body.user.user_id) });
  } catch (err) {
    res.status(200).json({ events: err.stack });
  }
};

export const findEventsByIdAndDate = async (req, res) => {
  const { user_id } = req.body.user;
  const { date, timezone } = req.params;
  let zone = timezone.split('-').join('/');
  const columns =
    'event_name, event_associate_recipe, event_description, event_start, event_end, event_duration';
  const clause = `WHERE user_id = ${user_id} AND (event_start::timestamptz AT TIME ZONE '${zone}')::date <= '${date}'::date AND (event_end::timestamptz AT TIME ZONE '${zone}')::date >= '${date}'::date`;
  try {
    const data = await eventsModel.select(columns, clause);
    res.status(200).json({ events: data.rows });
  } catch (err) {
    res.status(200).json({ events: err.stack });
  }
};

export const addEventByUserId = async (req, res) => {
  // const { id } = req.params;
  const { user_id } = req.body.user;
  const {
    event_name,
    event_associate_recipe,
    event_description,
    event_start,
    event_end,
    event_duration,
  } = req.body;
  // console.log(req.body);
  const columns =
    'USER_ID, EVENT_NAME, EVENT_ASSOCIATE_RECIPE, EVENT_DESCRIPTION, EVENT_START, EVENT_END, EVENT_DURATION';
  const values = `'${user_id}','${event_name}', '${event_associate_recipe}','${event_description}', '${event_start}', '${event_end}', '${event_duration}'`;
  try {
    const data = await eventsModel.insertWithReturn(columns, values);
    res.status(200).json({ events: data.rows });
  } catch (err) {
    // console.log(err);
    console.warn(err);
    res.status(200).json({ events: err.stack });
  }
};
