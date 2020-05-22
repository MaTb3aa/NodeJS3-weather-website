const request = require('request');


const forcast = (city , callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=f90063bd0ae4d93ea1eb20f191ff88cf&query='+(city)+''
    request({url, json : true },(error,{body}) => {
        if(error){
            callback(undefined,'Unable to connect to weather service!')
        }else if(body.success===false){
            callback(undefined,'Unable to find location')
        }else {
            const cur = body.current
           callback(undefined,('It is currently '+cur.temperature+' degrees out. It is '+ cur.weather_descriptions))
        }
    })
}

module.exports = forcast
