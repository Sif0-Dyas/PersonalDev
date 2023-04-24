this will be a step by step guide for a sample react based web application.
starting from front end to back end

-------START-------

From your preferred terminal of choice navigate to the directory that will house the application.

then from terminal:

1. `mkdir Project_Name` <--- (whatever you project name will be)

2. `cd Project_Name` <----(go into your new folder)

3. `mkdir server` <-----(create a server folder for back end use)

4. `npx create-react-app client` <----------(this will install most of the needed files and folders needed for a front end and create a client folder)


<<<-------Start set up client------->>>

5. `cd client` <----(go into your new folder)

-------install dependecies-------

 once inside client folder 

6. `npm install react-bootstrap bootstrap`

7. `npm install axios`

8. `npm install react-router-dom`


NOTE: these can all be shorthand chained into a single command, as well as you should install only what is needed for your app
`npm i axios react-bootstrap bootstrap react-router-dom`

9. create a `COMPONENTS` folder INSIDE the src folder this will house all the jsx files

optional: Create a `views` folder in the src folder


-------import dependecies-------

Add to top of your App.js 

10. `import "bootstrap/dist/css/bootstrap.min.css";` (only if you would like to use bootstrap)

11. `import axios from 'axios'`
 
12. `import { BrowserRouter, Routes, Route } from 'react-router-dom'`


the below code is a template with an index placeholder for a route.

-------app.js set up-------
<!-------copy paste starting below this line------->

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <h1>Sample text</h1>

        <Routes>
          <Route path="/" element={<CALL_YOUR_COMPONENT_HERE />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;

<!-------copy paste ending above this line------->

Your front end is now set up.

1.  `npm start` to spin up the dev frontend

<<<-------End client set up------->>>

_.~"(_.~"(_.~"(_.~"(_.~"(

<<<-------Start server set up------->>>

0. In the server folder you created set up the folder structure

-config
-controllers
-models
-routes

 open a second terminal in the server directory

1. add the server.js file in the root of server.

2. `npm init -y`(to initialize json)

3. `npm install express`

4. `npm install mongoose`

5. `npm install cors`

NOTE: these can all be chained into a single command as well as you should install only what is needed for your app
`npm i express mongoose cors`

!!!!!VERY IMPORTANT!!!!
6. create a file in the root of your sever called `.gitignore` and add `node_modules` in the first line. 

-------server.js setup-------
<!-------copy paste starting below this line------->

//import express and store express and cors in a variable
const express = require("express")
const cors = require('cors')
//initialize the express application and store it in a variable called 'app'
const app = express()

//intialize the port to 8000
const port = 8000

// use cors to be able to dev both front end and back end on the same network
app.use(cors())
//allow the application to parse json data (form information)
app.use(express.json())

//allow the application to accept form information
app.use(express.urlencoded({extended: true}))
// ^^^^needs to be avove the lines below 
require('./config/mongoose.config')

const Roputes = require('./routes/YOUR_DATA.routes')
//make sure you insert your routes name^^^^^
Routes(app)

//let's you know what port you are using
app.listen(port, () => console.log(`Listening on port: ${port}`))

<!-------copy paste ending above this line -->
-------end server.js setup-------

7. Create  a `mongoose.config.js` file inside of the config folder

template code
-------mongoose.config setup-------
<!-- copy paste starting below this line -->

const mongoose = require('mongoose')

const database = 'insert_your_database_here' 
// whatever your databse will be called^^

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb://localhost/${database}`, {
  // In some cases you mane need to change local host to `127.0.0.1` 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`established connection to the Database: ${database}`))
    .catch(err => console.log(`something wrong with database.`))

<!-- copy paste ending above this line------->
-------end mongoose.config setup--------------------

<<<-------End server set up------->>>

from here you are ready to build out your server for basic CRUD

8. `nodemon server.js` to spin up your dev backend

             ________________________________________________
            /                                                \
           |    _________________________________________     |
           |   |                                         |    |
           |   |  C:\> _Happy_Coding!                    |    |
           |   |                                         |    |
           |   |      SOP DOCS by ANDRES                 |    |
           |   |                                         |    |
           |   |                                         |    |
           |   |                                         |    |
           |   |                                         |    |
           |   |                                         |    |
           |   |                                         |    |
           |   |                                         |    |
           |   |                                         |    |
           |   |                                         |    |
           |   |_________________________________________|    |
           |                                                  |
            \_________________________________________________/
                   \___________________________________/
                ___________________________________________
             _-'    .-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.  --- `-_
          _-'.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.--.  .-.-.`-_
       _-'.-.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-`__`. .-.-.-.`-_
    _-'.-.-.-.-. .-----.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-----. .-.-.-.-.`-_
 _-'.-.-.-.-.-. .---.-. .-------------------------. .-.---. .---.-.-.-.`-_
:-------------------------------------------------------------------------:
`---._.-------------------------------------------------------------._.---'
