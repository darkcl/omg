#!/usr/bin/env node

const { exec } = require('child_process');

const args = process.argv.slice(2);

const fs = require('fs');
const path = require('path');
const os = require('os');

const homeDir = os.homedir();
const dir = homeDir + '/.omg';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

const configFilePath = path.join(dir, 'omg.json');

if (!fs.existsSync(configFilePath)){
  fs.writeFileSync(configFilePath, JSON.stringify([]));
}

const opt = JSON.parse(fs.readFileSync(path.join(dir, 'omg.json')).toString());

if (args.length !== 0) {

  if(args[0] === "add"){
    if(args.length !== 3) {
      console.log("Usage: omg add [name] [path]")
    }else{
      const book = {
        name: args[1],
        path: args[2]
      }
      opt.push(book);
      fs.writeFileSync(configFilePath, JSON.stringify(opt));
      console.log("Config Update");
    }
  }else{
    const pId = parseInt(args[0]);
    exec(`open ${opt[pId].path}`, (err, stdout, stderr) => {});
  }
}else{
  console.log('Open my god damn resource');
  if(opt.length !== 0){
    let idx = 0;
    opt.forEach(element => {
      console.log(`${idx} - ${element.name}`);
      idx++
    });
  }else{
    console.log("Empty config file in ~/.omg/omg.json");
    console.log("Consider using omg add [name] [path]");
  }
}

