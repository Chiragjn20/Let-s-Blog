const fs = require('fs');

const readStream = fs.createReadStream ('./chunk.txt'); 

const writeStream = fs.createWriteStream('./writechunk.txt');
readStream.on('data', (chunk) =>
{
console.log('-----New Chunk-----');
console.log(chunk.toString());

writeStream.write('\n New Chunk \n');
writeStream.write(chunk);

});

//read stream can also copied to write by using
// readStream.pipe(writeStream);