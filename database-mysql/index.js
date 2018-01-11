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

var getChannels = function(callback) {
  var base = 'https://slack.com/api/channels.list';
  var url = `${base}?token=${token}`;
  http.get(url, function(res) {
    var body = '';

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      console.log('end', JSON.parse(body));
      callback(JSON.parse(body));
    });
  });
};

module.exports.selectAll = selectAll;
module.exports.getChannels = getChannels;
