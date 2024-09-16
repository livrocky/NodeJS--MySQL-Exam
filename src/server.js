const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const userRoutes = require('./routes/userRoutes');
// const { showBody } = require('./middleware');
const accountRoutes = require('./routes/accountRoutes');
const billRoutes = require('./routes/billRoutes');
const groupRoutes = require('./routes/groupRoutes');

const app = express();

// MIDDLEWARE //
app.use(morgan('dev'));
app.use(express.json());
// app.use(showBody);
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes
app.use('/api', userRoutes);
app.use('/api', accountRoutes);
app.use('/api', billRoutes);
app.use('/api', groupRoutes);

app.all('*', (req, res) => {
  res.status(400).send({ error: 'Page not found' });
});

app.listen(PORT, () => console.log('Listening on port', PORT));
