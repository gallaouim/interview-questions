# What are Streams in Node.js?

Streams are a fundamental concept in Node.js for handling data that can be read or written continuously.

## Answer

Streams are objects that let you read data from a source or write data to a destination in a continuous fashion. They are especially useful for handling large files or data that comes in chunks, as they don't require loading everything into memory at once.

**Types of Streams:**
- **Readable**: Can read data from (e.g., `fs.createReadStream()`)
- **Writable**: Can write data to (e.g., `fs.createWriteStream()`)
- **Duplex**: Both readable and writable (e.g., TCP sockets)
- **Transform**: Duplex stream that can modify data (e.g., `zlib.createGzip()`)

**Example - Reading a file:**
```javascript
const fs = require('fs');

// Without streams (loads entire file into memory)
fs.readFile('large-file.txt', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});

// With streams (processes data in chunks)
const readStream = fs.createReadStream('large-file.txt', 'utf8');

readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk);
});

readStream.on('end', () => {
  console.log('Finished reading file');
});

readStream.on('error', (err) => {
  console.error('Error:', err);
});
```

**Example - Piping streams:**
```javascript
const fs = require('fs');
const zlib = require('zlib');

// Compress a file using streams
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'))
  .on('finish', () => {
    console.log('File compressed successfully');
  });
```

**Example - Custom Transform stream:**
```javascript
const { Transform } = require('stream');

class UpperCaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

process.stdin
  .pipe(new UpperCaseTransform())
  .pipe(process.stdout);
```

**Benefits:**
- Memory efficient (processes data in chunks)
- Time efficient (can start processing before all data is available)
- Composable (can pipe multiple streams together)

