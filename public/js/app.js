console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messege1 =document.querySelector('#message1')
const messege2 =document.querySelector('#message2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    console.log(location)
    messege1.textContent='Loading...'
    messege2.textContent=''
    fetch('/weather?address='+location+'').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messege1.textContent=data.error
        }
        else {
            messege1.textContent=data.location
            messege2.textContent=data.forecast

        }

    })
})

})