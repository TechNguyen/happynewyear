const btn = document.querySelector('.skip')
const happyaudio = document.getElementById('happy')
const fire = document.getElementById('fire')
const happyNumAgo = document.querySelector('.past-number')
const happyNumNext = document.querySelector('.next')
const logo = document.querySelector('.logo')
const wrapper = document.querySelector('.wrapper')
const firebtn = document.querySelector('.firebtn')
btn.addEventListener('click', () => {
    happyaudio.play()
    fire.play()
    var animationlogo = document.createElement('div')
    wrapper.appendChild(animationlogo)
    animationlogo.appendChild(logo)
    animationlogo.className = "animationlogo"
    setTimeout(() => {
        animationlogo.remove()
    }, 6000)
    happyNumAgo.classList.add("past")
    happyNumNext.classList.add("animationnext")
})

firebtn.addEventListener('click', function() {  
    wrapper.remove()
    fire.play()
    happyaudio.play()
    var canvas = document.createElement('canvas')
    var c = canvas.getContext('2d')
    document.body.appendChild(canvas)
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth;
    document.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    })
const ColorArray = [
    "#ffffff",
    "#F50000",
    "#EEA649",
    "#CCFF00",
    "#FF9900",
    "#FF3399",
    "#CC0066",
    "#00FF00",
    "#D9F12E",
    "#A4E60D",
    "#3FC10E",
    "#2AD8E9",
    "#2AD8E9",
    "#AE26E5",
    "#E72ED9"
];
function FireWork() {
    this.radius = Math.random() * 1.5 + 1.5;
    this.x = Math.random() * (canvas.width - 100) + (canvas.width / 20) 
    this.y = canvas.height + this.radius;
    this.color = ColorArray[(Math.floor(Math.random() * ColorArray.length))]
    this.valocity = {
        x : Math.random() * 1 + 2,
        y : Math.random() * 2 + 1,
    }
    this.maxY =  Math.random() * canvas.height / 2 + canvas.height/10
    this.life = false
}
FireWork.prototype.draw = function (c) {
    c.beginPath();
    c.arc(this.x, this.y, this.radius , 0 , Math.PI * 2)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
}
FireWork.prototype.update = function (c) {
    this.y -= this.valocity.y;
    this.maximumY()
    this.draw(c)
}
FireWork.prototype.maximumY = function (c) {
    if(this.y <= this.maxY) {
        this.life = true;
        for( let i = 0 ; i < 10; i++) {
            FrankWorkArr.push(new FrankWork(this.x , this.y , this.radius, this.color))
        }
    }
}
var FireWorkArr = []
var FrankWorkArr = []
var SpeardArr = []
function FrankWork( x, y,radius, color) {
    this.radius = radius / 2;
    this.x = x
    this.y = y
    this.color = color
    this.valocity = {
        x: Math.random() * 3 - 1,
        y: Math.random() * 3 - 1
    }
    this.life = 150;
    this.friction = 0.02
}
FrankWork.prototype.draw = function (c) {
    c.beginPath()
    c.arc(this.x, this.y , this.radius, 0 , Math.PI * 2)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
}
FrankWork.prototype.update = function(c) {
    this.valocity.y -= this.friction
    this.y += this.valocity.y
    this.x -= this.valocity.x
    this.life -= 1;
    this.maximum()
    this.draw(c)
}
FrankWork.prototype.maximum = function(c) {
    if(this.life == 0) {
        for( let i = 0 ; i < 4; i++) {
            SpeardArr.push(new Speard(this.x, this.y, this.radius))
        }
    }
}

function Speard( x, y,radius) {
    this.radius = radius / 3;
    this.x = x
    this.y = y
    this.color = ColorArray[Math.floor(Math.random() * ColorArray.length)]
    this.valocity = {
        x: Math.random() * 3 - 1,
        y: Math.random() * 2- 1
    }
    this.life = 100;
    this.friction = 0.01
}
Speard.prototype.draw = function (c) {
    c.beginPath()
    c.arc(this.x, this.y , this.radius, 0 , Math.PI * 2)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
}
Speard.prototype.update = function(c) {
    this.valocity.y -= this.friction
    this.y += this.valocity.y
    this.x += this.valocity.x
    this.life -= 1;
    this.draw(c)
}
var x  = new FireWork()
function init() {
    if(FireWorkArr.length < 5) {
        FireWorkArr.push(new FireWork())
    }
    x.update(c)
}
function animation () {
    window.requestAnimationFrame(animation)
    c.fillStyle = "rgba(0, 0, 0, 0.1)"
    c.fillRect(0 , 0, canvas.width, canvas.height)
    FireWorkArr.forEach((item, index) => {
        item.update(c)
        if(item.life) {
            FireWorkArr.splice(index, 1)
        }
    })
    FrankWorkArr.forEach((item, index) => {
        if(item.life <= 0) {
            FrankWorkArr.splice(index, 1)
        }
        item.update(c)
    })
    SpeardArr.forEach((item,index) => {
        if(item.life <= 0) {
            SpeardArr.splice(index, 1)
        }
        item.update(c)
    })
    init()
}
animation()
})


