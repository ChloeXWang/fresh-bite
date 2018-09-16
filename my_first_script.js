var http = require('http');

var request = require('request');

var server=http.createServer(function(req,res){
    res.end('test');
});

server.on('listening',function(){
    console.log('ok, server is running');
});

server.listen(8080);

/*http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(8080);*/

const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '1af8f561c0a041b2a8d876f47e126767'
});

var myList = [];
var myRecipes = [];

app.models.predict("bd367be194cf45149e75f01d59f77ba7", "https://samples.clarifai.com/food.jpg").then(
    function(response, error){
      //console.log(response);
      //console.log(response.outputs[0].data.concepts);
      //console.log(Object.prototype.toString.call(myArray));
      myArray = response.outputs[0].data.concepts;
      //console.log(Object.prototype.toString.call(myList));
      for(var i = 0; i < myArray.length; i++){
        myList.push(myArray[i].name);
      }
      console.log(myList);
      console.log(myList.toString());
    }
    );

const querystring = require('querystring');
const obj = {key: 'e8e54c2cb4361b9f43b8a53ade2c986d', q: myList, count: 10};
const urlQueryString = querystring.stringify(obj);
request.post(
    'https://www.food2fork.com/api/search?' + urlQueryString,
    { json: { key: 'value' } },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
          if (body.error == 'limit') {
            return console.log('going out limit')
          } else {
            console.log(body)
            console.log(body.recipes)
          }
          var recipe_ids = body.recipes.map(function(r){return r.recipe_id})
            console.log(recipe_ids)
          }
        }
      );
