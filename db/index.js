const mongo = require("./connect");
const ObjectID = require('mongodb').ObjectID
const { DB_NAME } = require("../config");

module.exports = {
    getTeams: function() {
        const db = mongo.instance().db(DB_NAME);
        const resp = db.collection("teams").find({}).toArray();
        return resp;
    },
    getTeamById: function(id) {
        try {
            const db = mongo.instance().db(DB_NAME);
            const resp = db.collection("teams").findOne({_id: new ObjectID(id)});
            return resp;            
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    },
    getTeamsByCompetitionId: function(id_competition) {
        const db = mongo.instance().db(DB_NAME);
        const resp = db.collection("teams").find({id_competition: Number(id_competition)}).toArray();
        return resp;
    },
    getPlayers: function() {
        const db = mongo.instance().db(DB_NAME);
        const resp = db.collection("players").find({}).toArray();
        return resp;
    },
    getPlayerById: function(id) {
        try {
            const db = mongo.instance().db(DB_NAME);
            const resp = db.collection("players").findOne({_id: new ObjectID(id)});
            return resp;
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    },
    postTeam: function(team) {
        const db = mongo.instance().db(DB_NAME);
        const resp = db.collection("teams").insertOne(team);
        return resp;
    },
    postTeamAddPlayer: function(id_team, player) {
        try {
            const db = mongo.instance().db(DB_NAME);
            const resp = db.collection("teams").updateOne({_id: new ObjectID(id_team)}, {'$addToSet': {players: player}});
            return resp;
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    },
    postPlayer: function(player) {
        const db = mongo.instance().db(DB_NAME);
        const resp = db.collection("players").insertOne(player);
        return resp;
    }
}