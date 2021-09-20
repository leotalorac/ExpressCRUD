const express = require('express')
const cors = require('cors')
const app = express()
const { connect } = require('./db')
const { helloWorld, createUser, getAllUsers, getUserByName, updateUser,deleteUser,login} = require('./controllers/users')

class App {
    constructor() {
        this.initApp()
        this.routes()
        this.initDatabase()
    }

    initApp() {
        app.use(cors())
        app.use(express.json());
    }

    routes() {
        // Routes
        app.get('/', helloWorld);
        app.post("/createuser",createUser);
        app.get("/getallusers",getAllUsers);
        app.get("/getuserbyname",getUserByName);
        app.put("/replaceuser",updateUser);
        app.delete("/deleteuser",deleteUser);
        app.get("/login",login);
    }

    initDatabase() {
        connect('mongodb+srv://AdminEndava:Endava2021@endava.yyroa.mongodb.net/Endava?retryWrites=true&w=majority')
    }

    initServer(port) {
        app.listen(port, () => {
            console.log(`Server Listening on http://localhost:${port}`);
        });
    }
}

module.exports = App
