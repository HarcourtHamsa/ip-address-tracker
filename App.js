'use strict'

const ipAddress = document.querySelector('#ip-address');
const currentLocation = document.querySelector('#location');
const timezone = document.querySelector('#timezone');
const ISP = document.querySelector('#isp');
const map = document.querySelector('#map');
const form = document.querySelector('#form');

let mymap;

const fetchDataFromAPI = async (url) => {
    const res = await fetch(url, { method: 'GET' })
    const data = await res.json()
    return data
}

const updateDom = (string, node) => {
    return node.textContent = string
}

const generateMap = (lat, lng) => {
    mymap = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZnJlZXNjcnB0IiwiYSI6ImNraWM0NDFnZTAzeTcydW53MTlnZHAyMWcifQ.BXPzp1_-KOfx81HhdQbiJg'
    }).addTo(mymap);

    var customMarker = L.icon({
        iconUrl: '/images/icon-location.svg'
    })

    L.marker([lat, lng], { icon: customMarker }).addTo(mymap);


}

window.addEventListener('load', (e) => {
    e.preventDefault()
    fetchDataFromAPI('https://geo.ipify.org/api/v1?apiKey=at_SiWYhDVWYhoXkh83evd7TFNVZstqQ')
        .then((data) => {
            const { ip, isp, location } = data

            updateDom(ip, ipAddress)
            updateDom(location.region, currentLocation)
            updateDom(location.timezone, timezone)
            updateDom(isp, ISP)

            generateMap(location.lat, location.lng)
        }).catch(err => alert(err))
})


form.addEventListener('submit', (e) => {
    e.preventDefault()  // prevent page reload
    const userInput = document.querySelector('#userInput').value

    fetchDataFromAPI(`
    https://geo.ipify.org/api/v1?apiKey=at_SiWYhDVWYhoXkh83evd7TFNVZstqQ&ipAddress=${userInput}
        `)
        .then((data) => {
            const { ip, isp, location } = data

            updateDom(ip, ipAddress)
            updateDom(location.region, currentLocation)
            updateDom(location.timezone, timezone)
            updateDom(isp, ISP)


            mymap.remove()  // remove existing map
            generateMap(location.lat, location.lng)
        })


})

