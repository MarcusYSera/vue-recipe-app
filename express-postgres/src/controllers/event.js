import Model from '../models/model.js';

const eventsModel = new Model('events');

export const eventsPage = async (req, res) => {
  try {
    const data = await eventsModel.select(
      'user_fkid, event_name, event_date, event_start_end, event_time'
    );
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
  const { eventName, eventDate, eventStartEnd, eventTime } = req.body;
  // console.log(req.body);
  const columns = 'USER_FKID, EVENT_NAME, EVENT_DATE, EVENT_START_END, EVENT_TIME';
  const values = `'${userId}','${eventName}', '${eventDate}', '${eventStartEnd}', '${eventTime}'`;
  try {
    const data = await eventsModel.insertWithReturn(columns, values);
    res.status(200).json({ events: data.rows });
  } catch (err) {
    res.status(200).json({ events: err.stack });
  }
};
