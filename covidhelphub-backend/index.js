import { PrismaClient } from '@prisma/client'


import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const prisma = new PrismaClient()

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CovidHelpHub AP." });
});

app.get("/program/list", async (req, res) => {
    const programs = await prisma.program.findMany();
    return res.json( programs );
  });
  
  
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});