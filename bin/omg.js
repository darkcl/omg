#!/usr/bin/env node

const { exec } = require('child_process');

const args = process.argv.slice(2);

const opt = require('../omg.json');

if (args.length !== 0) {
  const pId = parseInt(args[0]);
  exec(`open ${opt[pId].path}`, (err, stdout, stderr) => {});
}else{
  console.log('Open my godamn resource');
  let idx = 0;
  opt.forEach(element => {
    console.log(`${idx} - ${element.name}`);
    idx++
  });
  
}

