# carcool_football

## Installing
     npm install

## Endpoints
- /competitions (get)- Obtendra el detalle de todas las ligas 
- /competitions/:competition_id (get)- Obtiene el detalle de una liga especifica (Equipos y Jugadores que luego serán almacenados localmente)
- /teams (get)- Muestra todos los equipos que se han almacenado hasta el momento
- /teams/:team_id (get)- Muestra el detalle de los equipo seleccionado
- /players (get)-  Muestra todos los jugadores almacenados hasta el momento

## Extra Endpoints
- /teams (post)- Guarda un equipo
```json
{
	"id_competition": 2000,
	"name": "perú"
}
```
- /players (post)- Guarda un jugador
```json
{
	"name": "Paolo Guerrero",
	"position": "delantero",
	"number": 9
}
```
- /teams/add_player (post) - Agrega un jugador a un equipo
```json
{
	"id_team": "5d6fff3b3809ff06d84bfb31",
	"id_player": "5d6ffe7f5953c411783c6adb"
}
```
## Example
    >npm start
    >localhost:3000/api/competitions
