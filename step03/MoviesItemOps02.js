var AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000'
});

var dynamodbDoc = new AWS.DynamoDB.DocumentClient();

var table = 'Movies';

var year = 2015;
var title = 'The Big New Movie';

// Attempt a conditional write. We expect this to fail

var params = {
  TableName: table,
  Item: {
    'year': year,
    'title': title,
    'info': {
      'plot': 'Nothing happens at all.',
      'rating': 0.0
    }
  },
  ConditionExpression: '#yr <> :yyyy and title <> :t',
  ExpressionAttributeNames: {
    '#yr': 'year'
  },
  ExpressionAttributeValues: {
    ':yyyy': year,
    ':t': title
  }
};

console.log('Attempting a conditional write...');
dynamodbDoc.put(params, function(err, data) {
  if (err) {
    console.error('Unable to put item. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('PutItem succeeded:', JSON.stringify(data, null, 2));
  }
});
