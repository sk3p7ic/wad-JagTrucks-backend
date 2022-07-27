const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  date: Date,
  truck_id: { type: Schema.Types.ObjectId, ref: "Trucks" },
  start_time: String,
  end_time: String,
});

const ScheduleModel = mongoose.model("Schedules", scheduleSchema);

const addSchedule = ({ date, truck, start_time, end_time }) => {
  ScheduleModel.create(
    {
      date: date,
      truck_id: truck._id,
      start_time: start_time,
      end_time: end_time,
    },
    (err, newSchedule) => {
      if (err) return handleError(err);
    }
  );
};
