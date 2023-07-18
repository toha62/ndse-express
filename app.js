const express = require('express');

const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
