const mongodb = require('mongodb');
const fs = require('fs');
const assert = require('assert');

const uri = 'mongodb://localhost:27017';
const dbname = 'mydb';

mongodb.MongoClient.connect(uri,  { useNewUrlParser: true } , (err, client)=>{
    assert.ifError(err);

    const db = client.db(dbname);

    var bucket = new mongodb.GridFSBucket(db);

    fs.createReadStream('./test.jpg').pipe(bucket.openUploadStream('image.jpg'))
    .on('error', function(error) {
        assert.ifError(error);
      }).
      on('finish', function() {
        console.log('done!');
        process.exit(0);
      });
})