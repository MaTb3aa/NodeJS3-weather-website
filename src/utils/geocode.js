const request = require('request')


const geocode = (address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWF0YjNhYSIsImEiOiJja2FjMm5jaXMxY2U5MzJxdzFrbzg2Y20wIn0.44JL59uohNXcW5bYI0svlA&limit=1'
    request({url , json : true}, (error, {body})=>{
        if(error){
               callback(('Unable to connect to weather service!',undefined))
        }else if(body.features.length==0){
                callback('Unable to find location',undefined)
        }
        else {
            /*
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            console.log(latitude)
            console.log(longitude)
            */
           const cur =  {
            city : body.features[0].text,
            place_name : body.features[0].place_name 
           }
           callback(undefined,(cur))
        }
    })
}
module.exports=geocode