module.exports = {
  HOST: "ec2-3-212-75-25.compute-1.amazonaws.com",
  USER: "zavunorhcvlqdl",
  PASSWORD: "7b69679b668f3e6d9c7f5268dc52e10243a444ef79a486404bc15872019ac56b",
  DB: "d642g79eq20895",
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