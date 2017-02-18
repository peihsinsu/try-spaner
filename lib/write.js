var gcloud = require('google-cloud');
var spanner = gcloud.spanner;

var spannerClient = spanner({
  projectId: 'sunny-573'
});

var instance = spannerClient.instance('my-instance');
var database = instance.database('my-database');
// Insert data into the table.
var table = database.table('Singers');

table.insert({
  SingerId: 10,
  FirstName: 'Eddie',
  LastName: 'Wilson'
}, function(err) {
  if (!err) {
    // Row inserted successfully.
  }
});

