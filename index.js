const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const dbConfig = require('./config/index');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocumentation = YAML.load('./swagger.yaml');

require('dotenv').config()
const app = express();
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());
require('./app/route/index')(app)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));




mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome"});
});

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});