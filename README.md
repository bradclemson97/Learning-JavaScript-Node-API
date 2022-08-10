# Learning-JavaScript-Node-API

This is a demonstration of building a RESTful API with Node.js. Making use of the Node.js frammework 'express', HTTP requests are dealt with based on users’ “route”. A route is a path on the server like http://yourserver.com/path/to/route. This example API handles routes and call-backs for the user to asynchronously add, retrieve and search for values stored in a key-value JavaScript object. The JavaScript object is stored in a very simple database using local JSON files and the node.js "fs"(file-system) package. 

## Getting Started

### Dependencies

* Node
* Express

### Installing

1. Ensure you have the latest version of Node installed.
   ```sh
   $ node --version
   ```
2. Install express 
   ```sh
   $ npm install express --save
   ```
3. Clone the repo
   ```sh
   git clone https://github.com/bradclemson97/Learning-JavaScript-Node-API.git
   ```
4. Point to the project directory, start the server
   ```sh
   $ node server.js
   ```
5. Optional: configure server to restart whenever the code is changed
   ```sh
   $ sudo npm install nodemon -g
   ```

### Help

The server is currently configured to be hosted on port 3000 and routes to the API are via http://localhost:3000/*.

Avoid using nodemon when writing to the JavaScript object. The resetting of the server means based on code changes means that when the .json file containing the JavaScript obejct is updated, the server will restart during runtime. 

### Authors

Contributors names and contact info

ex. Bradley Clemson 
ex. [@bradclemson](https://twitter.com/bradclemson)

### Version History

1.0 Initial version
