const path = require('path')

const {cpu, mem, os} = require('node-os-utils')


const quotientAndRestPartOfDivision = (dividend, divisor)=>{
  const quocient = Math.floor(dividend/divisor)

  const rest = dividend%divisor

  console.log(dividend, divisor, quocient, rest)
  return [quocient, rest]
}

const convertSecondsToDaysHoursMinutesSeconds = (timeInSeconds) => {
  const [days, restTimeOverSecondsInADay] = quotientAndRestPartOfDivision(timeInSeconds, 86400) 
  const [hours, restTimeOverSecondsInAHour] = quotientAndRestPartOfDivision(restTimeOverSecondsInADay, 3600)
  const [minutes, seconds] = quotientAndRestPartOfDivision(restTimeOverSecondsInAHour, 60)
  
  return {days, hours, minutes, seconds}
}

const rotina = setInterval(()=>{
  cpu.usage().then(info=>{
    document.getElementById('cpu-usage').innerText = info + " %"

    document.getElementById('cpu-progress').style.width = info+'%'
    
  })

  cpu.free().then(info=>{
    document.getElementById('cpu-free').innerText = info + " %"
  })

  const {days, hours, minutes, seconds} = convertSecondsToDaysHoursMinutesSeconds (os.uptime())

  document.getElementById('sys-uptime').innerText = `days: ${days}, hours: ${hours}, minutes: ${minutes}, seconds: ${seconds}`

}, 2000)

document.getElementById('cpu-model').innerText = cpu.model()

document.getElementById('comp-name').innerText = os.hostname()

document.getElementById('os').innerText = `${os.type()} ${os.arch()}`

mem.info().then((info)=>{
  document.getElementById('mem-total').innerText = info.totalMemMb
})