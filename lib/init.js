var gcloud = require('google-cloud');
var spanner = gcloud.spanner;

var spannerClient = spanner({
  projectId: 'sunny-573'
});

var instance = spannerClient.instance('my-instance');
var database = instance.database('my-database');

// Create a table.
var schema =
  'CREATE TABLE Singers (' +
  '  SingerId INT64 NOT NULL,' +
  '  FirstName STRING(1024),' +
  '  LastName STRING(1024),' +
  '  SingerInfo BYTES(MAX),' +
  ') PRIMARY KEY(SingerId)';

database.createTable(schema, function(err, table, operation) {
  if (err) {
    // Error handling omitted.
  }

  operation
    .on('error', function(err) {})
    .on('complete', function() {
      // Table created successfully.
    });
});

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

// Run a query as a readable object stream.
database.runStream('SELECT * FROM Singers')
  .on('error', function(err) {})
  .on('data', function(row) {
    // row.toJSON() = {
    //   SingerId: 10,
    //   FirstName: 'Eddie',
    //   LastName: 'Wilson'
    // }
		console.log('>>>>', row);
  })
  .on('end', function() {
    // All results retrieved.
  });
