module.exports = {
  HOST: "ec2-3-212-75-25.compute-1.amazonaws.com",
  USER: "eccgdbavtjrjvc",
  PASSWORD: "2e9be62a1003d5e3f31a737f75c7de9b08c17f0a0dac4fb23bcf1f90ca88155d",
  DB: "d55k37rnpfsui1",
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