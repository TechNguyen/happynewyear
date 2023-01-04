document.addEventListener('DOMContentLoaded', function() {
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
    "#FF0000",
    "#33FF33",
    "#CCFF00",
    "#FF9900",
    "#3399FF",
    "#FF3399",
    "#CC0066",
    "#00FF00"];
function FireWork() {
    this.radius = 5;
    this.x = Math.random() * canvas.width
    this.y = canvas.height + this.radius;
    this.color = ColorArray[(Math.floor(Math.random() * ColorArray.length))]
    this.valocity = {
        x : Math.random() * 3 + 3,
        y : Math.random() * 6 - 3
    }
    this.maxY =  Math.random() * canvas.height / 4 + canvas.height/10
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
    }
}
var x  = new FireWork()
var FireWorkArr = []
function init() {
    if(FireWorkArr.length < 20) {
        FireWorkArr.push(new FireWork())
    }
    x.update(c)
}
function animation () {
    window.requestAnimationFrame(animation)
    c.fillStyle = "rgba(0, 0, 0, 1)"
    c.fillRect(0 , 0, canvas.width, canvas.height)
    FireWorkArr.forEach((item, index) => {
        item.update(c)
        if(item.life) {
            FireWorkArr.splice(index, 1)
        }
    })
    init()
}
animation()
})