const express = require('express'); // express.js
const PORT = process.env.PORT || 3001;
const app = express(); // instantiate express.js
const fs = require('fs');
const path = require('path');

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});
