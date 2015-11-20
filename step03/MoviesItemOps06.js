var AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000'
});

var dynamodbDoc = new AWS.DynamoDB.DocumentClient();

var table = 'Movies';

var year = 2015;
var title = 'The Big New Movie';

// Conditional update (will fail)

var params = {
  TableName: table,
  Key: {
    'year': year,
    'title': title
  },
  ConditionExpression: 'info.rating <= :val',
  ExpressionAttributeValues: {
    ':val': 10.0
  }
};

console.log('Attempting a conditional delete...');
dynamodbDoc.delete(params, function(err, data) {
  if (err) {
    console.error('Unable to delete item. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('DeleteItem succeeded:', JSON.stringify(data, null, 2));
  }
});
