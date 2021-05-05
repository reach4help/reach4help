/* eslint-disable guard-for-in */
import { PrismaClient } from '@prisma/client';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const prisma = new PrismaClient();

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CovidHelpHub AP.' });
});

app.get('/program/list', async (req, res) => {
  const programs = await prisma.program.findMany({
    orderBy: [{ sequence: 'asc' }],
  });
  return res.json({ data: programs });
});

app.post('/program/create', async (req, res) => {
  const { body } = req;
  try {
    const program = await prisma.program.create({ data: body });
    return res.json({ data: program });
  } catch (err) {
    const x = { err: err.message };
    return res.json(x);
  }
});

app.post('/program/savemany', async (req, res) => {
  const { body } = req;
  await prisma.program.deleteMany({});
  const programs = body;

  const newProgramsPromise = programs.map(async (program, i) => {
    const newProgram = { ...program, sequence: i };
    const resultProgram = await prisma.program.create({ data: newProgram });
    return resultProgram;
  });
  const newPrograms = await Promise.all(newProgramsPromise);
  return res.json({ data: newPrograms });
});

app.get('/step/list', async (req, res) => {
  const steps = await prisma.step.findMany({ orderBy: [{ sequence: 'asc' }] });
  return res.json({ data: steps });
});

app.post('/step/savemany', async (req, res) => {
  console.log('req', req.json());
  const { body } = req;
  const steps = body;
  await prisma.step.deleteMany({});

  const newStepPromises = steps.map(async (step, i) => {
    const newStep = { ...step, sequence: i };
    const resultStep = await prisma.step.create({ data: newStep });
    return resultStep;
  });
  const newSteps = await Promise.all(newStepPromises);

  return res.json({ data: newSteps });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
