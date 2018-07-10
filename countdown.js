const WINDOW_WIDTH = 1024
const WINDOW_HEIGHT = 768
const RADIUS = 8
const MARGIN_TOP = 60
const MARGIN_LEFT = 30
const endTime = new Date(2018, 6, 10, 12, 47, 52)
let curShowTimeSeconds = 0

window.onload = function () {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = WINDOW_WIDTH
    canvas.height = WINDOW_HEIGHT
    curShowTimeSeconds = getCurrentShowTimeSeconds()
    setInterval(
        function () {
            render(ctx)
            update()
        }, 50
    )
}

function update () {
    const nextShowTimeSeconds = getCurrentShowTimeSeconds()

    // const nextHours = parseInt(nextShowTimeSeconds / 3600)
    // const nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60)
    const nextSeconds = nextShowTimeSeconds % 60

    // const curHours = parseInt(curShowTimeSeconds / 3600)
    // const curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60)
    const curSeconds = curShowTimeSeconds % 60

    if (nextSeconds !== curSeconds) {
        curShowTimeSeconds = nextShowTimeSeconds
    }
    
}

function getCurrentShowTimeSeconds () {
    const curTime = new Date()
    let ret = endTime.getTime() - curTime.getTime()
    ret = Math.round(ret / 1000)
    return ret >= 0 ? ret : 0

}

function render (ctx) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)

    const hours = parseInt(curShowTimeSeconds / 3600)
    const minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60)
    const seconds = curShowTimeSeconds % 60

    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , ctx )
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , ctx )
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , ctx )
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , ctx);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , ctx);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , ctx);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , ctx);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , ctx);
}

function renderDigit (x, y, num, ctx) {
    ctx.fillStyle = 'rgb(0, 102, 153)'

    for (let i = 0; i < digit[num].length; i++) {
        for (let j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] === 1) {
                ctx.beginPath()
                ctx.arc( x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0, 2*Math.PI)
                ctx.closePath()
                ctx.fill()
            }
        }
    }

}

