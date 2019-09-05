const axios = require("axios");
const { TIMEOUT } = require("../config");

module.exports = {
    getCompetitions:  function(){
        return getData('competitions');
    },
    getCompetitionById:  function(id){
        return getData(`competitions/${id}`);
    }
}

const instanceAxios = axios.create({
    baseURL: 'http://api.football-data.org/v2/',
    timeout: TIMEOUT,
    headers: {'X-Auth-Token': 'bc45c692a0bf4210a7bf158280e3e490'}
});

const getData = async url => {
  try {
    const response = await instanceAxios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};