let tenPrint = {
    canvas: document.getElementById('canvas'),
    context: canvas.getContext('2d'),
    textSpacing: {x: 20, y: 20},
    textPos: {x: 0, y: 16},
    interval: null,
    charMatrix: [],

    init: () => {
        tenPrint.context.font = "22px Courier, monospace";
        tenPrint.interval = setInterval(tenPrint.printOneChar, 10);
    },
    printOneChar: () => {
        if (tenPrint.textPos.x >= tenPrint.canvas.width && tenPrint.textPos.y >= tenPrint.canvas.height) {
            clearInterval(tenPrint.interval);
        }
        
        tenPrint.context.fillStyle = tenPrint.getRandomColor();
        tenPrint.context.fillText(tenPrint.getChar(), tenPrint.textPos.x, tenPrint.textPos.y);
        
        if (tenPrint.textPos.x >= tenPrint.canvas.width)
        {
            tenPrint.textPos.x = 0;
            tenPrint.textPos.y += tenPrint.textSpacing.y;
        } else {
            tenPrint.textPos.x += tenPrint.textSpacing.x;
        }
    },
    getChar: () => {
        if (Math.random() > 0.5) {
            return "╱";
        } else {
            return "╲";
        }
    },
    getRandomColor: () => {
        //return '#' + ((1<<24)*Math.random()|0).toString(16);
        var value = Math.random() * 0xFF | 0;
        var grayscale = (value << 16) | (value << 8) | value;
        return '#' + grayscale.toString(16);
    }
}

tenPrint.init();