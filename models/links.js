"use strict";

module.exports = function(sequelize, DataTypes) {
  var Links = sequelize.define("Links", {
    url: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Links;
};
