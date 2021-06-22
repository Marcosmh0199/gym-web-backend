module.exports = {
  HOST: "ec2-54-145-224-156.compute-1.amazonaws.com",
  USER: "saityqiteiimom",
  PASSWORD: "dd4ce2a3dc2df7bf324b1f58cda68063b9ef5a47b133fbd7630a7da5db4bb172",
  DB: "db7lebtn8og8m6",
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};