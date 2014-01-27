var assert = require("chai").assert,
		path = require("path"),
		randomString = require("random-string"),
		rootPath = path.join(__dirname, "../../"),
		util = require("util"),
		env = process.env.NODE_ENV || "development",
		config = require(rootPath + "/config/config")(env),
		Base = require(path.join(rootPath, "app/models")),
		Postcode = require(path.join(rootPath, "app/models/postcode"));

var getCustomRelation = function () {
	var relationName = randomString({
			  length: 8,
			  numeric: false,
			  letters: true,
			  special: false
			}),
			schema = {
				"id" : "serial PRIMARY KEY",
				"somefield": "varchar(255)"
			};

	function CustomRelation() {
		Base.Base.call(this, relationName, schema);
	}

	util.inherits(CustomRelation, Base.Base);

	return new CustomRelation();
}

module.exports = {
	rootPath: rootPath,
	config: config,
	Base: Base,
	Postcode: Postcode,
	getCustomRelation: getCustomRelation,
	seedPaths: {
		customRelation: path.join(rootPath, "/tests/seed/customRelation.csv"),
		postcodes: path.join(rootPath, "/tests/seed/postcodes.csv")
	}
}

