
function checkDate() {
    console.log(document.getElementById('phoneNo'))
    var now = new Date();
    now = now.toISOString().split('T')[0];
    console.log("now = " + now + "   \n curr = " + document.getElementById("date").value);
    now = Date.parse(now);
    var curr = Date.parse(document.getElementById("date").value);
    console.log("now------>", now);
    console.log("curr------>", curr);
    if (now > curr) {
        document.getElementById("btn").disabled = true;
        document.getElementById("btn").style.color = '#808080'
        document.getElementById("valid").textContent = "Invalid date";
        //document.getElementById("btn").style.transform = none
        // alert("Date must be in future");
    } else {
        document.getElementById("btn").disabled = false;
        document.getElementById("btn").style.color = ''
        document.getElementById("valid").textContent = "";
    }


}
function pSex() {
    console.log('hello from onchange');
    document.getElementById("hide").value = document.getElementById("sex").value;
    console.log();
}