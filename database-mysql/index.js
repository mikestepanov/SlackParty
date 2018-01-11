var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pass',
  database : 'test'
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
  connection.query('SELECT * FROM items', function(err, results, fields) {
    var base = 'https://slack.com/api/channels.list';
    var url = `${base}?token=${token}`;

    http.get(url, function(res) {

    });
  });
};




module.exports.selectAll = selectAll;
