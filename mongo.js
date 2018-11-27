const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;

const env = require('./env/environment');

const mongoUri = `mongodb://${env.dbName}:${env.key}@${env.dbName}.documents.azure.com:${env.cosmosPort}/?ssl=true`;

//const mongoUri = 'mongodb://my-cosmos-todo:HgwerCBF07HaCTLQ08g2w0DGbqqwoyYjxbwla8ZxoJXyKWhcaWs20baEEyxOEC8gxYHHu6sfKlNa1OBs3rIfHA%3D%3D@my-cosmos-todo.documents.azure.com:10255/?ssl=true';

console.log(mongoUri);

//const mongoUri = 'mongodb://127.0.0.1:27017/todoapp';


function connect() {
    return mongoose.connect(mongoUri)
            .then(() => { console.log('Succesfully Connected to the Mongodb Database  at URL : '+mongoUri) })
            .catch(() => { console.log('Error Connecting to the Mongodb Database at URL : '+mongoUri) })
}

module.exports = {
    connect
};