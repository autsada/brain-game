let firstNumbersList
let secondNumbersList
let countedNumbers

let timer
let totalTime
let reset

const timeStart = () => {
  timer = setInterval(() => {
    totalTime++

    //1207 > milliSeconds = 1207 % 100 = 7 -> 07
    // seconds = 1207 - 7 = 1200 / 100 = 12
    let milliSeconds = totalTime % 100
    let seconds = (totalTime - milliSeconds) / 100

    if (milliSeconds < 10) {
      milliSeconds = `0${milliSeconds}`
    }

    if (seconds < 10) {
      seconds = `0${seconds}`
    }

    document.getElementById('timer').innerHTML = `${seconds} : ${milliSeconds}`
  }, 10)
}

const timeStop = () => clearInterval(timer)

const autoReset = () => {
  if (countedNumbers.length === 0) {
    reset = setInterval(firstDisplay, 8000)
  }
}

// Find random number from 1-25 for first display
const firstDisplay = () => {
  clearInterval(reset)
  timeStop()
  totalTime = 0

  firstNumbersList = []
  secondNumbersList = []
  countedNumbers = []

  document.getElementById('timer').innerHTML = '00 : 00'

  for (let i = 1; i < 26; i++) {
    // i = 1 [] -> 5 -> [5]
    // i = 2 [5] -> 7 -> [5, 7]
    const getNumber = () => {
      const number = Math.floor(Math.random() * 25) + 1 // 0 - 1

      const exist = firstNumbersList.find(item => item === number)

      if (exist) return getNumber()

      firstNumbersList.push(number)
    }
    getNumber()
  }

  //console.log(firstNumbersList)
  firstNumbersList.map((num, i) => {
    const html = document.getElementById(`${i + 1}`)
    html.innerHTML = num

    // TODO: attach click function to each element
    html.addEventListener('click', playGame(html))
  })

  autoReset()
}

window.onload = firstDisplay

const playGame = element => () => {
  clearInterval(reset)
  const value = element.innerHTML

  // Check if value starts from 1 -> 2 -> 3
  // [] -> 1 !== 0 + 1 -> false
  // [] -> 2 !== 0 + 1 -> true
  if (+value !== countedNumbers.length + 1) return

  // [] -> 1 !== 0 + 1 -> false -> [1]
  countedNumbers.push(+value)

  // If player clicks 1 -> start timer
  if (countedNumbers.length === 1) {
    // Start timer
    timeStart()
  }

  // Check if value < 26 -> find new random number from 26-50 to display replacing the old number
  if (+value < 26) {
    const getNumber = () => {
      const newNumber = Math.floor(Math.random() * 25) + 26

      const exist = secondNumbersList.find(item => item === newNumber)

      if (exist) return getNumber()

      secondNumbersList.push(newNumber)
      element.innerHTML = newNumber
    }
    getNumber()
  } else {
    element.innerHTML = ''
  }

  // If count to 50 -> stop timer
  if (countedNumbers.length === 50) {
    // Stop timer
    timeStop()
  }
}

// Restart
document.getElementById('restart').addEventListener('click', firstDisplay)
