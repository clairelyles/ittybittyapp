var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models/index.js");
var Hashids = require("hashids");
	hashids = new Hashids("so salty");

var app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/Public"));
app.use(bodyParser.urlencoded({extended:false}));

app.get("/", function(req, res) {
	res.render("index");
})

app.post("/thanks", function(req, res) {
	if (req.body === "") {
		var errMsg = {msg: "Please enter a valid URL"};
		res.render("index", {errMsg: errMsg});
	}
	db.Links.findOrCreate({where: req.body}).done(function(err,data,notCreated) {
		if(notCreated) {
			var encrypted = hashids.encode(data.id);
			data.token = encrypted;
			data.save().done(function (err,data2) {
				res.render("thanks", {"token": data2.token});
			})
		}
		else {
			res.render("thanks", {"token": data.token});
		}
	})
})

app.listen(process.env.PORT || 3000);