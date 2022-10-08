const mongoose = require('mongoose');

const dbConnection = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);

    console.log('Base de datos online');
  } catch (error) {
    throw new Error('Error a la hora de iniciar la base de datos');
  }
};

module.exports = {
  dbConnection,
};
