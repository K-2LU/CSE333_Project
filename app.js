const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mysql = require("mysql");

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


var uId, uType;
var ok = 0, st = 0;


app.get("/", function (req, res) {
    res.render("userhomepage", { ok: ok, uId: uId, uType: uType });
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
            res.render("doctors", { result1: result1, result2: result2, ok: ok, uId: uId, uType: uType });
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
            db.query("Select * from department where dept_id = ?", [dept_id], (err, dt) => {
                //console.log(dt);
                dept = dt[0].dept_name;
                res.render("doctor-profile-patient", { data: data, dept: dept, ok: ok, uId: uId, uType: uType });
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
                res.render("form-book", { data: data, dept: dept, ok: ok, uId: uId, uType: uType });
            });
        }

    });
});

//------------------------Appoitment-----------------------------
app.post("/appointment", (req, res) => {
    console.log("body : " + req.body.name + " " + req.body.phone + " " + req.body.pAge + " " + req.body.hSex
        + " " + req.body.date);
    //console.log("id---" + req.body.id);
    var { pName: p_name, phone: p_phone, pAge: p_age, hSex: p_sex, date: a_time, name: d_id } = req.body;
    // var { p_name, p_phone} = req.body;
    // var pName = req.body.p_name
    // console.log(p_name, p_phone);
    var id, key, pass;
    if (ok === 1) id = uId;
    else id = p_phone;
    db.query("Select * from usertype where id = ?", [id], (error, data) => {
        console.log("error heree----------");
        if (data.length == 0) {
            pass = Math.floor(Math.random() * 10000 + 1000);
            var password = pass.toString();
            db.query("insert into patient set ?", { id: id, password: password }, (error, data) => {
                var p_id = id;
                db.query("Insert into visit set ?", {
                    p_id: p_id, d_id: d_id, a_time: a_time,
                    a_status: 0, p_name: p_name, p_age: p_age, p_sex: p_sex, p_phone: p_phone
                }, (err, dt) => {
                    id = d_id;

                    db.query("Select name from doctor where id = ?", [id], (err, dt) => {
                        res.render("form-success", {
                            ok: ok, uId: uId, uType: uType,
                            d_name: dt, p_name: p_name, time: a_time
                        });
                    });

                });

            });
            id = p_phone;
            console.log(id);
            // db.query("insert into usertype set ?", { id: id, u_type: "patient", password: password });
        }
        else {
            p_id = id;
            db.query("Insert into visit set ?", {
                p_id: p_id, d_id: d_id, a_time: a_time,
                a_status: 0, p_name: p_name, p_age: p_age, p_sex: p_sex, p_phone: p_phone
            }, (err, dt) => {
                id = d_id;
                db.query("Select name from doctor where id = ?", [id], (err, dt) => {
                    console.log(dt);
                    res.render("form-success", {
                        ok: ok, uId: uId, uType: uType,
                        d_name: dt, p_name: p_name, time: a_time
                    });
                });
            });
        }
    });
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
            res.render("userhomepage", { ok: ok, uId: uId, uType: uType });
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

// app.get("/doctor-profile", (req, res) => {
//     db.query("Select * from visit where d_id = ?", [uId], (error, result) => {
//         res.render("doctor-profile", { ok: ok, uId: uId, uType: uType, result: result });
//     });
// });
app.get("/doctor-profile", (req, res) => {
    var a_time = new Date().toISOString().split('T')[0];
    db.query("Select * from visit where d_id = ? and a_time = ?", [uId, a_time], (error, result) => {
        var id = uId;
        db.query("select * from doctor, department where doctor.dept_id = department.dept_id and doctor.id = ?"
            , [id], (err, data) => {
                //console.log(data);
                res.render("doctor-profile", { ok: ok, uId: uId, uType: uType, result: result, data: data });
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
                res.render("doctor-profile-history", { ok: ok, uId: uId, uType: uType, result: result, data: data });
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
                res.render("doctor-profile-future", { ok: ok, uId: uId, uType: uType, result: result, data: data });
            })

    });
});

//--------------patient-profile----------------------
app.get("/patient-profile", (req, res) => {
    var p_id = uId;
    var id = uId;
    db.query("Select * from visit where p_id=?", [p_id], (error, result) => {
        //console.log(error);

        db.query("select * from doctor, department where doctor.dept_id = department.dept_id", (err, data) => {
            console.log(err);
            //console.log(data);
            db.query("select * from patient where id = ?", [id], (er, dt) => {
                //console.log(dt);
                res.render("patient-profile", {
                    ok: ok, uId: uId, uType: uType,
                    result: result, data: data, name: dt
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