const express = require("express");
var cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
try {
  db.sequelize.sync({alter : true}).catch(
    (err) => {
      console.log(err);
    }
  );
} catch (error) {
  db.sequelize.close()
}
*/

app.get("/", (req, res) => {
  res.json({ message: "ITCR - Musculos a la tica Gym Web" });
});

require("./src/routes/routes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function(err) {
  if (err){
    console.log('Something went wrong', err)
  } else{
    console.log(`Server is running on port ${PORT}.`);
  }
});