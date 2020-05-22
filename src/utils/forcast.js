const request = require('request');


const forcast = (city , callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=f90063bd0ae4d93ea1eb20f191ff88cf&query='+(city)
    request({url, json : true },(error,{body}) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.success==false){
            callback('Unable to find location',undefined)
        }else {            
            
            callback(undefined,('The Weather currently is '+body.current.temperature+' degrees out. It is '+ body.current.weather_descriptions+' . The Observation Time is '+body.current.observation_time+' . '))
        }
    })
}

module.exports = forcast
