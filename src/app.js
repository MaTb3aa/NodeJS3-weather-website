const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const chalk = require('chalk')
const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'MaTb3aa'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'MaTb3aa'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'MaTb3aa'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error :'You must provide address'
        })
    }
    geocode(req.query.address,(error,{city,place_name}={})=>{

        if(error){
            return res.send({error}) 
        }
        forcast(city,(error,forcastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forcastData,
                location: place_name,
                address : req.query.address
                
            })
        })
        
    })
   
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'MaTb3aa',
        errorMessege: 'Help article not found.',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'MaTb3aa',
        errorMessege: 'Page not found.',
    })
})


app.listen(port, () => {
    console.log('Server is up on port '+port)
})