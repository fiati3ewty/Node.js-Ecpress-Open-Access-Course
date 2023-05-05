const express = require('express');
const app = express();

// Account Info
var accessId = 'I94rfhizUtKL2vqw5KJR';
var accessKey =
  'lma_{~6Ny)IHqsU3r+86)7yM8zdHca%~+Zy^e-PmL]n3M(-+2kr+4WFgvCM[CY2mLNzQxMWVlNDgtODU2NS0xMWU2LTlmYjItMGE0NzE3MzBlZjM3L1AUHh2';
var company = 'cloudhm';
var queryParams = '';

// Request Details
var httpVerb = 'GET';
var epoch = new Date().getTime();
// var resourcePath = '/device/devices';
var resourcePath = '/setting/admins';

// Construct signature
var requestVars = httpVerb + epoch + resourcePath;
var crypto = require('crypto');
var hex = crypto
  .createHmac('sha256', accessKey)
  .update(requestVars)
  .digest('hex');
var signature = Buffer.from(hex).toString('base64');

// Construct auth header
var auth = 'LMv1 ' + accessId + ':' + signature + ':' + epoch;
// Configure request options
var request = require('request');
var options = {
  method: httpVerb,
  uri: 'https://' + company + '.logicmonitor.com/santaba/rest' + resourcePath,
  headers: {
    ContentType: 'application/json',
    Authorization: auth,
  },
  qs: {
    fields: 'id,name',
    filter: 'name~ip',
  },
};

// Make request
request(options, (error, response, body) => {
  if (!error && response.statusCode == 200) {
    app.get('/', (req, res) => {
      res.set('Content-Type', 'application/json');
      res.send(body);
    });
  } else {
    console.log('Authorization FAIL !!');
  }
});

app.listen(3000);
