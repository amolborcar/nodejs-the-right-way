'use strict';

// NOTE: not connecting properly using telnet

const fs = require('fs'),
      net = require('net'),
      filename = process.argv[2],
      server = net.createServer(function(connection){
       // reporting
        console.log('Subscriber connected');
        connection.write(JSON.stringify({
          type: 'watching',
          file: filename
        }) + '\n');

        // watcher setup
        let watcher = fs.watch(filename, function(){
          connection.write(JSON.stringify({
            type: 'changed',
            file: filename,
            timestampe: Date.now()
          }) + '\n');
        });

        // cleanup
        connection.on('close', function(){
          console.log('Subscriber disconnected');
          watcher.close();
        });
      });

if (!filename){
  throw Error('No file specified!');
}

server.listen('/tmp/another1.sock', function(){
  console.log('Listening...');
});