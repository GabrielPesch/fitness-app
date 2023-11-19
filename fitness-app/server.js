

const jsonServer = require('json-server');
const path = require('path');
const express = require('express');


const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json')); 
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(router);


const PORT = process.env.PORT || 3000; 
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
