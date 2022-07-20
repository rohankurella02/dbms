const express = require('express')
const app = express()
const bodyParser = require("body-parser")
var mysql = require('mysql');
var cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3001



app.listen(port, ()=> console.log(`Dolphin app listening on port ${port}!`))

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Babu@4321",
  database: "college"
});

app.get("/api/student/get", (req,res)=>{
    db.query("SELECT * FROM student", (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   });

app.get("/api/teacher/get", (req,res)=>{
    db.query("SELECT * FROM teacher", (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   });

    app.post("/api/teacher/post", function(req, res) {
        console.log("Post request called ", res.body)
        const name=req.body.name;
        const email_id=req.body.email_id;
        const roll_no=req.body.roll_no;
        var values = [[name, email_id, roll_no]]

    db.query(
        "INSERT INTO teacher(name, email_id, roll_no) VALUES ?",
        [values],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Values Inserted");
          }
        }
      );
})

app.post("/api/student/post", function(req, res) {
    console.log("Post request called ", res.body)
    
    const id=req.body.id;
    const roll_no=req.body.roll_no;
    const name=req.body.name;
    const section=req.body.section;
    const email_id=req.body.email_id;
    
    var values = [[id, roll_no, name, section, email_id]]

db.query(
    "INSERT INTO student(id, roll_no, name, section, email_id) VALUES ?",
    [values],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
})

app.delete(`/api/teacher/delete/:id`, (req, res) => {
    const id = req.params.id;
    db.query(
        "DELETE FROM teacher WHERE id = ?",
        id, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(result);
            }
        }
    )
})

app.delete(`/api/student/delete/:id`, (req, res) => {
    const id = req.params.id;
    db.query(
        "DELETE FROM student WHERE id = ?",
        id, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(result);
            }
        }
    )
})

app.get("/", (req, res) => {
    res.json("YO");
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

  /*var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  })*/

  var displayTeacher= () => {
    db.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;
        console.log(result[2].name);
      })
  }

  db.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    console.log(result[2].name);
  })

  var deleteTeacher = (id) => {
    var sql = "DELETE FROM teacher WHERE id = ?";
    db.query(sql, id, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
    })
    }

    var insertTeacher = (name, email_id, roll_no) => {
        var sql = "INSERT INTO teacher(name, email_id, roll_no) VALUES ?";
        var values = [[name, email_id, roll_no]]
        db.query(sql, [values], function(err, result) {
            if(err) throw err;
            console.log("No. of records inserted: " + result.affectedRows)
        })
    }
    /*insertTeacher("Dr John Doe", "test@vnrvjiet.in", "1234-5678-9876")    */

    displayTeacher();

app.get('/', function (req, res) {
    res.send('Hello World');
 })