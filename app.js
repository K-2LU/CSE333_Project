const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mysql = require("mysql2");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

dotenv.config({ path: "./.env" });

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Mysql is connected");
    }
});


var uId, uType, uName;
var ok = 0, st = 0;

let a_time = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00PM", "3:00PM", "3:30PM", "4:00PM", "4:30PM",
    "7:00PM", "7:30PM", "8:00PM", "8:30PM", "9:00PM", "9:30PM"];

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

app.get("/", function (req, res) {
    res.render("userhomepage", { ok: ok, uId: uId, uType: uType, uName: uName, title: "Welcome" });
});

app.get("/tests", function (req, res) {
    res.render("tests", { ok: ok, uId: uId, uType: uType, uName: uName, title: "Tests" });
});

app.get("/pricing", function (req, res) {
    res.render("pricing", { ok: ok, uId: uId, uType: uType, uName: uName, title: "Our Pricings" });
});

//---------------------------------------------------------for user------------------------------------

//----------------------------doctors-------------------------
const getFromServer = (query, value) => {
    return new Promise((resolve, reject) => {
        db.query(query, value, function (error, data) {
            if (error) {
                reject(error);
            }
            else {
                resolve(data);
            }
        });

    });
}

app.get("/doctors", (req, res) => {

    var result1, result2;
    var dept_ids = new Array();
    let query = "SELECT * FROM department";
    let value = [""];

    getFromServer(query, value).then(data => {
        //console.log(data);
        result1 = data;
        console.log(result1);
        query = "SELECT * FROM doctor";
        let value = [""];

        getFromServer(query, value).then(data => {
            result2 = data;
            //console.log(result2);
            res.render("doctors", { result1: result1, result2: result2, ok: ok, uId: uId, uType: uType, uName: uName, title: "Doctors" });
        });
    }).catch(err => {
        console.log(err);
    });
});

//------------------------------Doctors-Profile-Patient-----------------------------------
app.post("/doctor-profile-patient", (req, res) => {
    var id = req.body.name;
    var dept;
    //console.log(id);

    db.query("Select * from doctor where id = ?", [id], (error, data) => {
        if (error) {
            console.log(error);
        } else {
            //console.log(data);
            dept_id = data[0].dept_id;
            var doctorName = data[0].name;
            db.query("Select * from department where dept_id = ?", [dept_id], (err, dt) => {
                //console.log(dt);
                dept = dt[0].dept_name;
                res.render("doctor-profile-patient", { data: data, dept: dept, ok: ok, uId: uId, uType: uType, uName: uName, title: doctorName });
            });

        }

    });
});

//-------------------form-book----------------
app.post("/form-book", (req, res) => {
    var id = req.body.name;
    var dept;
    //console.log(id);

    db.query("Select * from doctor where id = ?", [id], (error, data) => {
        if (error) {
            console.log(error);
        } else {
            //console.log(data);
            dept_id = data[0].dept_id;
            db.query("Select * from department where dept_id = ?", [dept_id], (err, dt) => {
                //console.log(dt);
                dept = dt[0].name;
                id = uId;
                res.render("form-book", { data: data, dept: dept, ok: ok, uId: uId, uType: uType, uName: uName, title: "Book an Appointment" });
            });
        }

    });
});

//------------------------Appoitment-----------------------------

app.post("/appointment", async(req, res) => {

    var name = req.body.name;
    var d_id = req.body.doc_id;
    var phone = req.body.phone;
    var age = req.body.age;
    var sex = req.body.sex;
    var date = req.body.date;

    var id, key, pass;
    if (ok === 1) id = uId;
    else id = phone;

    var query = "SELECT * FROM patient WHERE id = ?";
    var value = [id];

    var result = await getFromServer(query, value); 

    // if patient is not registered
    var p_id, key, exists = 0;

    if(result.length == 0)  {
        
        key = generateRandomString(8);
        console.log(p_id, key);

        query = "INSERT INTO patient(id, name, password) VALUES(?, ?, ?)";
        value = [phone, name, key];
        result = await getFromServer(query, value);
        // console.log(time);

        query = "INSERT INTO userType (id, password, u_type) VALUES(?, ?, ?)";
        value = [phone, key, "patient"];
        result = await getFromServer(query, value);

    }   else    {
        p_id = result[0].id;
        exists = 1;
    }

    // console.log(p_id, result[0].name);

    query = "SELECT * FROM visit WHERE d_id = ? AND a_time = ?";
    value = [d_id, date];
    result = await getFromServer(query, value);

    var serial = result.length + 1;
    console.log(serial);
    
    let time = a_time[result.length];
    console.log(time);

    var app_id = generateRandomString(10);
    
    var a_status = 0;

    query = "INSERT INTO visit(id, p_id, d_id, a_time, p_name, p_sex, p_age, serial, a_status, p_phone) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    value = [app_id, id, d_id, date, name, sex, age, serial, a_status, phone];
    result = await getFromServer(query, value);

    if(result)  {
        result = await getFromServer("SELECT * FROM doctor WHERE id = ?", [d_id]);
        var d_name = result[0].name;
        var room = req.body.room;

        res.render("form-success", { 
            
            ok: ok, uId: uId, uType: uType, key: key, flag: exists, title: "Appointment Successful",
            uName:uName,d_name: d_name, p_name: name, date: date, time: time, room:room
        });
    }   else    {
        res.render("form-fail", {title: "Appointment Failed"});
    }
});

//--------------------login-----------------------------
app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    var id = req.body.id;
    var password = req.body.pass;
    db.query("Select * from usertype where id = ? and password = ?", [id, password], (error, data) => {
        if (data.length > 0) {
            ok = 1;
            uId = data[0].id;
            uType = data[0].u_type;
            console.log(uType);
            uName = "doctor"
            if(uType == "patient") uName = "patient"; 
            db.query(`Select name from ${uName} where id = ?`, [uId], (err, dt) => {
                uName = dt[0].name;
                res.render("userhomepage", { ok: ok, uId: uId, uType: uType, uName: uName, title: "Welcome"});
            });

            
        }
        else {
            res.render("login");
        }
    })
});


//---------------Register-----------------------

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    var { name, phone, password } = req.body;
    var id = phone;
    db.query("insert into patient set ?", { id: id, password: password, name: name }, (error, data) => {
        db.query("insert into usertype set ?", { id: id, u_type: "patient", password: password }, (err, dt) => {
            res.render("login");
        });
    });
});

//---------Doctor Profile-----------------------------

app.get("/doctor-profile", (req, res) => {
    
    var date = new Date().toISOString().split('T')[0];

    db.query("Select * from visit where d_id = ? and a_time = ? order by serial asc", [uId, date], (error, result) => {
        var id = uId;
        db.query("select * from doctor, department where doctor.dept_id = department.dept_id and doctor.id = ?"
            , [id], (err, data) => {
                console.log(result);
                res.render("doctor-profile", { ok: ok, uId: uId, uType: uType, result: result, data: data, uName:uName, title: "Doctor Profile"});
            })

    });
});

//-----------------Mark as done-------------------------
app.post("/changeStatus", (req, res) => {
    var id = req.body.btn;
    console.log(id);
    db.query("update visit Set a_status = ? where id = ?", [1, id], (error, result) => {
        res.redirect("/doctor-profile");
    });
});


//------------history------------------------
app.get("/history", (req, res) => {
    var a_time = new Date().toISOString().split('T')[0];
    db.query("Select * from visit where d_id = ?", [uId], (error, result) => {
        var id = uId;
        db.query("select * from doctor, department where doctor.dept_id = department.dept_id and doctor.id = ?"
            , [id], (err, data) => {
                //console.log(data);
                res.render("doctor-profile-history", { ok: ok, uId: uId, uType: uType, result: result, data: data, uName:uName, title: "History" });
            })

    });
});

//----------------------future--------------------------------
app.get("/future", (req, res) => {
    db.query("Select * from visit where d_id = ?", [uId], (error, result) => {
        var id = uId;
        db.query("select * from doctor, department where doctor.dept_id = department.dept_id and doctor.id = ?"
            , [id], (err, data) => {
                //console.log(data);
                res.render("doctor-profile-future", { ok: ok, uId: uId, uType: uType, result: result, data: data, uName:uName, title: "Future Appointments" });
            })

    });
});

//--------------patient-profile----------------------
app.get("/patient-profile", (req, res) => {
    var p_id = uId;
    var id = uId;
    db.query("Select * from visit where p_id=? order by a_time, serial asc", [p_id], (error, result) => {
        console.log(result);

        db.query("select * from doctor, department where doctor.dept_id = department.dept_id", (err, data) => {
            // console.log(err);
            //console.log(data);
            db.query("select * from patient where id = ?", [id], (er, dt) => {
                //console.log(dt);
                res.render("patient-profile", {
                    ok: ok, uId: uId, uType: uType, title: "Profile",
                    result: result, data: data, name: dt, uName:uName
                });
            });
        });

    });
});


//----------------cancle-appointment-----------------------
app.post("/cancle-appointment", (req, res) => {
    id = req.body.btn;
    console.log(id);
    db.query("delete from visit where id = ?", [id], (error, result) => {
        console.log(result);
        res.redirect("/patient-profile");
    });
});


//----------------logout------------------
app.get("/logout", (req, res) => {
    ok = 0;
    uId = "";
    uType = "";
    res.redirect("/");
});


app.get('/get_data', function (request, response, next) {

    var search_query = request.query.search_query;


    var query = `SELECT doctor.name AS doctor_name, doctor.id AS doctor_id, department.dept_name AS 
    department_name FROM doctor JOIN department ON doctor.dept_id = department.dept_id WHERE doctor.name 
    LIKE '%${search_query}%' OR department.dept_name LIKE '%${search_query}%' OR doctor.id LIKE 
    '%${search_query}%' LIMIT 10`;

    db.query(query, function (error, data) {
        response.json(data);

    });

});


//-----------------forgot password------------------------
app.get("/forgot", (req, res) => {
    res.render("forgot", { key: "", flag: 0 });
});

app.post("/forgot", (req, res) => {

    var key, id = req.body.id;

    db.query("select * from usertype where id = ?", [id], (error, result) => {
        if (result.length > 0) {
            res.render("forgot", { key: result[0].password, flag: 1 });
        }
        else {
            res.render("forgot", { key: "", flag: 1 });
        }
    });

});

app.listen(5000, function () {
    console.log("server is running on port 5000");
});


// var imgDir = "./images/" + toString(id) + ".png";