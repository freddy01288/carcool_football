const express = require("express");
const service = require("../services/football-data");
const { getTeams, getTeamById, getTeamsByCompetitionId, postTeam, postTeamAddPlayer, getPlayers, getPlayerById, postPlayer } = require("../db");
const api = express.Router();

api.get('/competitions', async (req, res, next)=>{
    const resp = await service.getCompetitions();
    if(!resp){
        return next(new Error('error timeout football service'))
    }    
    return res.json(resp);
})
api.get('/competitions/:id', async (req, res, next)=>{
    const resp = await service.getCompetitionById(req.params.id);
    if(!resp){
        return next(new Error('competition not found'))
    }
    const queryTeams = await getTeamsByCompetitionId(req.params.id);
    resp.teams = queryTeams;
    return res.json(resp);
})
api.get('/teams', async (req, res)=>{
    const resp = await getTeams();
    return res.json(resp);
})
api.get('/teams/:id', async (req, res, next)=>{
    const resp = await getTeamById(req.params.id);
    if(!resp){
        return next(new Error('team not found'))
    }
    return res.json(resp);
})
api.get('/players', async (req, res)=>{
    const resp = await getPlayers();
    return res.json(resp);
})
api.get('/players/:id', async (req, res)=>{
    const resp = await getPlayerById(req.params.id);
    return res.json(resp);
})
api.post('/teams', async (req, res)=>{
    const team = req.body;
    const resp = await postTeam(team);
    return res.json(resp.insertedId);
})
api.post('/teams/add_player', async (req, res)=>{
    const id_team = req.body.id_team;
    const id_player = req.body.id_player;
    const player = await getPlayerById(id_player);
    const resp = await postTeamAddPlayer(id_team, player);
    return res.json(resp);
})
api.post('/players', async (req, res)=>{
    const player = req.body;
    const resp = await postPlayer(player);
    return res.json(resp.insertedId);
})  

module.exports = api