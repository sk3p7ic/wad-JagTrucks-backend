const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  _id: Schema.Types.ObjectId,
  date: Date,
  truck_id: { type: Schema.Types.ObjectId, ref: "Trucks" },
  start_time: String,
  end_time: String,
});

const ScheduleModel = mongoose.model("Schedules", scheduleSchema);

const addSchedule = ({ date, truck_id, start_time, end_time }) => {
  ScheduleModel.create(
    {
      _id: new mongoose.Types.ObjectId(),
      date: date,
      truck_id: truck_id,
      start_time: start_time,
      end_time: end_time,
    },
    (err, newSchedule) => {
      if (err) return handleError(err);
    }
  );
};

const getSchedule = (response) => {
  ScheduleModel.find({}, (err, sched) => {
    if (err) {
      console.log("Error retrieving schedule");
      response.send("{undefined}");
    }
    response.send(sched);
  });
};

const getScheduleForMonth = (year, month, response) => {
  ScheduleModel.aggregate(
    [
      { $addFields: { year: { $year: "$date" }, month: { $month: "$date" } } },
      { $match: { year: parseInt(year), month: parseInt(month) } },
    ],
    (err, results) => {
      if (err) {
        console.log(`Error getting schedule: ${err}`);
        response.send("{undefined}");
      }
      response.send(results);
    }
  );
};

const getScheduleForDay = (year, month, day, response) => {
  ScheduleModel.aggregate(
    [
      { $addFields: { year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } } },
      { $match: { year: parseInt(year), month: parseInt(month), day: parseInt(day) } },
    ],
    (err, results) => {
      if (err) {
        console.log(`Error getting schedule: ${err}`);
        response.send("{undefined}");
      }
      response.send(results);
    }
  );
};

module.exports = { addSchedule, getSchedule, getScheduleForMonth, getScheduleForDay };
