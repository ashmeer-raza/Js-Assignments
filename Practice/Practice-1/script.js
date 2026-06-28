const main = document.querySelector('.main')
const over = document.querySelector('#overlay')
const start = document.querySelector('.start')
const reset = document.querySelector('.reset')
const timer = document.querySelector('#time')
const scores = document.querySelector('#score')


const box = document.createElement('div')
box.classList.add('box')

let time = 0;
let score = 0;
let interval;

const randomColor = () => {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random()*256)
    let b = Math.floor(Math.random() * 256)
    
    return `rgb(${r}, ${g}, ${b})` //rgb(0, 0, 0) 
}

const boxArea = () => {
    main.append(box);
    box.style.backgroundColor = randomColor()

    let mainH = main.clientHeight - box.offsetHeight; 
    let mainW = main.clientWidth - box.offsetWidth;


    let rx = Math.random() * mainW;
    let ry = Math.random() * mainH;
    box.style.top = `${ry}px`
    box.style.left = `${rx}px`
}

start.addEventListener('click', () => {
    clearInterval(interval)

    interval = setInterval(() => {
        boxArea()
        time += 1;
        timer.textContent = time
        box.innerHTML = time
    }, 1000);

    setTimeout(() => {
        clearInterval(interval)
        over.style.display = 'flex';
    }, 10000)
})

box.addEventListener('click', () => {
    score += 1;
    scores.innerHTML = score;
})

// reset.addEventListener('click', () => {
//     setTimeout(() => {
//         clearInterval(interval)
//         time = 0;
//         timer.textContent = time;
//         box.innerHTML = '';
//         over.style.display = "none";
//     }, 10 )
// })