require('./db/index');

const teacherModel = require('./schema/teacher');
teacherModel
  .findOne({
    age: {
      $gte: 20,
    },
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
