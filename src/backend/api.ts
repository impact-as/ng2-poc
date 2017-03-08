var util = require('util');
var fs = require('fs'); 
var {Router} = require('express');

// Our API for demos only
import {fakeDataBase} from './db';
import {fakeDemoRedisCache} from './cache';

// you would use cookies/token etc
var USER_ID = 'f9d98cf1-1b96-464e-8755-bcc2a5c09077'; // hardcoded as an example

// Our API for demos only
export function serverApi(req, res) {
  let key = USER_ID + '/data.json';
  let cache = fakeDemoRedisCache.get(key);
  if (cache !== undefined) {
    console.log('/data.json Cache Hit');
    return res.json(cache);
  }
  console.log('/data.json Cache Miss');

  fakeDataBase.get()
    .then(data => {
      fakeDemoRedisCache.set(key, data);
      return data;
    })
    .then(data => res.json(data));
}


var PAGES = [
  { Id:"25316857-8454-4567-ad56-507ac608385c", NavigationTitle:"Forside", Url:"/forside" },
  { Id:"b3b339fc-96f7-441b-bd95-9cfb0b4d4726", NavigationTitle:"Om os", Url:"/om-os" },
  { Id:"03361698-0ed7-4d1b-99f0-5a315d1e646e", NavigationTitle:"Service", Url:"/service" },
  { Id:"4cd173a3-156a-4d16-bfb0-b7a711a69ac4", NavigationTitle:"Kontakt", Url:"/kontakt" }
];


function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}

export function createTodoApi() {

  var router = Router()

  router.route('/menu')
    .get(function(req, res) {
      // 70ms latency
      setTimeout(function() {
        res.json(PAGES);
      }, 0);

    });

  router.route('/page/:id')
    .get(function(req, res) {
      // 70ms latency
      var filename = req.params.id;
      if(filename === "") {
        filename = "forside";
      }

      readJSONFile('./pages/' + req.params.id + '.json', function (err, json) {
        if(err) { throw err; }
        res.json(json);
      });

    });


  return router;
};
