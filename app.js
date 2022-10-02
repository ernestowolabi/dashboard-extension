const unsplashKey = 'tbrMSA6W56EOyc-071B5YD93mxbEojQbHNcegAVdwE4'
const openWeatherKey = 'dc4bcd2433b33754a129ca18539a426b'
const authorEl = document.getElementById('author')
const cryptoEl = document.getElementById('crypto-top')
const timeEl = document.getElementById('time')
const weatherEl = document.getElementById('weather')


const backgroundImage = async () => {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${unsplashKey}&orientation=landscape&query=nature`)
    const data = await response.json()
    document.body.style = `
        background: url(${data.urls.full}) no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
      `
    authorEl.textContent = `By: ${data.user.name}`

  } catch (error) {
    console.error(error)
    document.body.style = `
        background: url('https://images.unsplash.com/photo-1470770903676-69b98201ea1c?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNjI2MTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjI3NTMzMzQ&ixlib=rb-1.2.1&q=80') no-repeat center center fixed; 
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
      `
  }
}

backgroundImage()

const cryptoData = async () => {
  try {
    const response = await fetch('https:api.coingecko.com/api/v3/coins/bitcoin')
    const data = await response.json()
    cryptoEl.innerHTML = `<img src=${data.image.small} > <span>${data.name}</span>`
    document.getElementById('crypto').innerHTML += `<p><i class="fa-solid fa-right-left"></i> $${data.market_data.current_price.usd}</p> <p><i class="fa-solid fa-up-long"></i> $${data.market_data.high_24h.usd}</p> <p><i class="fa-solid fa-down-long"></i> $${data.market_data.low_24h.usd}</p>`

  } catch (error) {
    console.error(error)
  }
}

cryptoData()

const getTime = () => {
  const today = new Date();
  let time = today.toLocaleTimeString('en-us', {timeStyle: 'short'})
  console.log(time)
  timeEl.textContent = time
}

setInterval(getTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
  const response = fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${openWeatherKey}`)
  .then(res => {
    if (!res.ok) {
      
      throw Error('Weather data not available')
    } 
      return res.json()
  })
  .then(data => {
    console.log(data)
    const iconUrl = ``
    weatherEl.innerHTML = `
      <img src=${iconUrl} />
      <p class='temperature'>${Math.round(data.main.temp)}&#8451</p>
      <p class='weather-city'>${data.name}</p>
    `

  })

  .catch(err => {
    console.error(err)
  })
  
})






// const getWeather = async () => {
//   try {
//     const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=${openWeatherKey}`)
//     const data  = await response.json()

//   } catch (error) {
//     console.error(error)
//     weatherEl.textContent = `Error loading weather data`
//     console.log(weatherEl)
//   }
// }
