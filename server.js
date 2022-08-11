//this imports the .fs (file-system) package...
var fs = require('fs');
//using sync makes sure that the file is read before doing anything else in our code which is what we want to do
//below reads the raw file data...
var data = fs.readFileSync('additional.json');
var afinndata = fs.readFileSync('afinn111.json');

//'parsing' translates the raw input data into a readable formant
var additional = JSON.parse(data);
var afinn = JSON.parse(afinndata);

//the way to access code from a node package is through the require() function
//this is like an import statement, 'import the class express'
var express = require('express');
//use of package body-parser to help parse post requests
var bodyParser = require('body-parser');
var cors = require('cors');

//With a reference to express, you can then create an express "app"
var app = express();

//All of our server and client functionality is on our local computer,
//in this case we are listening at port 3000
var server = app.listen(3000, listening);

//Callback to show that we are listening
function listening() {
    console.log('listening. . . ');
}

/*
    we are serving our static files (e.g. index.html file) from within the 'website' folder
    Now anytime you enter the url to your server (if you are running it on your machine, this will be http://localhost:3000),
    the contents of the public folder will be hosted.
 */
app.use(express.static('website'));

//use bodyParser package and parse everything as JSON...
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(
    bodyParser.urlencoded({
        extended: true
    })
); // support encoded bodies

app.use(cors());

//A 'post' request is more secure than an 'add'/get request
app.post('/analyze', analyzeThis);

/*
    to make a post request, in p5 there is a function named httpPost.
    We have configured our index.html and sketch.js to have an 'analyse' button which will send our post request.
    In our previous add/get requests could find our input data from the request via request.params.
    But in post requests there isn't just request parameters, there is a whole body containing loads of information which we
    need to parse. To help we can use a package named 'body-parser' which does the parsing for us.
 */
function analyzeThis(request, response) {
    var txt = request.body.text;
    //'\W/ is anything not A-Z or 0-9
    var words = txt.split(/\W+/);
    var totalScore = 0;
    var wordlist = [];
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var score = 0;
        var found = false;
        if (additional.hasOwnProperty(word)) {
            score = Number(additional[word]);
            found = true;
        } else if (afinn.hasOwnProperty(word)) {
            score = Number(afinn[word]);
            found = true;
        }
        if (found) {
            wordlist.push({
                word: word,
                score: score
            });
        }
        totalScore += score;
    }

    var comp = totalScore / words.length;

    var reply = {
        score: totalScore,
        comparative: comp,
        words: wordlist
    };
    response.send(reply);
}

/*
    setting up a route for a user add request to localhost:3000/add and a call back (addWord) to the add request
    ':word' is an existing object containing what the user is wanting to search for/add to
    '?' after 'score' makes adding a score optional
 */
app.get('/add/:word/:score?', addWord);

function addWord(request, response) {
    var data = request.params;
    var word = data.word;
    var score = Number(data.score);
    var reply;
    if (!score && score !== 0) {
        var reply = {
            msg: 'Score is required.'
        };
        response.send(reply);
    } else {
        additional[word] = score;
        /*
            Taking the data in from the user and adding it to the 'word' object with a key-value pair
            word = the value, score = the key
            write data back to the additional.json file asynchronously
         */
        var data = JSON.stringify(additional, null, 2);
        fs.writeFile('additional.json', data, finished);
    }
}

function finished(err) {
    console.log('all set.');
    reply = {
        word: word,
        score: score,
        status: 'success'
    };
    response.send(reply);
}

/*
    Setting up a route for the user to retrieve the word object and all its contents.
    Using express, express will automatically format our javascript object ('additional') as Json
 */
app.get('/all', sendAll);

function sendAll(request, response) {
    var data = {
        additional: additional,
        afinn: afinn
    };
    response.send(data);
}

//setting up a search route for if the user wants to query a particular word and get the score back
app.get('/search/:word/', searchWord);

function searchWord(request, response) {
    var word = request.params.word;
    var reply;
    if (words[word]) {
        reply = {
            status: 'found',
            word: word,
            score: words[word]
        };
    } else {
        reply = {
            status: 'not found',
            word: word
        };
    }
    response.send(reply);
}