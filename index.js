import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db=new pg.Client({
user:"postgres",
host:"localhost",
password:"mounika#123",
database:"world",
port:5432
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let country_code=[];
app.get("/", async (req, res) => {
  //Write your code here.
  // const countries = result.rows.map(row => row.country_code); // Extract country_code
  const total=country_code.length;

  res.render("index.ejs",{countries:country_code,total});
 

});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Database connected.');
  }
});
app.post("/add",async(req,res)=>{
const p=req.body.country;
const c=p;
const result=await db.query("select country_code,country_name from countries");
console.log('Database query result:', result.rows);
const countries = {};

result.rows.forEach(row => {
  if (row.country_name) {
    countries[row.country_name] = row.country_code;
  }
});
console.log(countries);

const matchingKey = Object.keys(countries).find(key => key === c);

if (matchingKey) {
  const countryCode = countries[matchingKey];
  country_code.push(countryCode);
  const total=country_code.length;

  res.render("index.ejs",{ countries: country_code, total });

}
else {
  console.log('No match found');
}


});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});