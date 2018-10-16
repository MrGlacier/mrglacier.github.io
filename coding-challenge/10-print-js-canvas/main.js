const tenPrint = {
    config: {
        canvas: {
            width: 160,
            height: 160,
            background: '#D71F32'
        },
        startPos: {
            x: 0,
            y: 0
        }
    },
    cursor: {
        width: 10,
        height: 10,
        currentPosition: {
            x: 0,
            y: 0
        },
        colors: ['#262626'],
    },
    canvas: null,
    context: null,
    init: () => {
        tenPrint.initializeCanvas();
        tenPrint.setBackground();
        
        tenPrint.update();
    },
    initializeCanvas: () => {
        tenPrint.canvas = document.getElementsByTagName('canvas')[0];
        tenPrint.context = tenPrint.canvas.getContext('2d');

        tenPrint.canvas.width  = tenPrint.config.canvas.width;
        tenPrint.canvas.height = tenPrint.config.canvas.height; 
        tenPrint.canvas.style.width  = tenPrint.config.canvas.width;
        tenPrint.canvas.style.height = tenPrint.config.canvas.height;
    },
    update: () => {
        tenPrint.drawSlash();
        tenPrint.updateCursor();

        window.requestAnimationFrame(tenPrint.update);
    },
    drawSlash: () => {
        let context = tenPrint.context;
        let cursor = tenPrint.cursor;

        context.beginPath();
        if (Math.random() > 0.5) {
            context.moveTo(cursor.currentPosition.x + cursor.width, cursor.currentPosition.y);
            context.lineTo(cursor.currentPosition.x, cursor.currentPosition.y + cursor.height);
        } else {
            context.moveTo(cursor.currentPosition.x, cursor.currentPosition.y);
            context.lineTo(cursor.currentPosition.x + cursor.width, cursor.currentPosition.y + cursor.height);
        }
        context.lineWidth = 2;
        context.strokeStyle = tenPrint.getRandomStrokeColor();
        context.stroke();
    },
    updateCursor: () => {
        tenPrint.cursor.currentPosition.x += tenPrint.cursor.width;
        
        if (tenPrint.cursor.currentPosition.x >= tenPrint.canvas.width) {
            tenPrint.cursor.currentPosition.x = 0;
            tenPrint.cursor.currentPosition.y += tenPrint.cursor.height;
        } else if(tenPrint.cursor.currentPosition.y >= tenPrint.canvas.height) {
            tenPrint.clearCanvas();
            tenPrint.resetCursor();
        }
    },
    resetCursor: () => {
        tenPrint.cursor.currentPosition.x = 0;
        tenPrint.cursor.currentPosition.y = 0;
    },
    clearCanvas: () => {
        tenPrint.setBackground();
    },
    setBackground: (color) => {
        if (color == undefined) {
            color = tenPrint.config.canvas.background;
        }

        tenPrint.context.fillStyle = color;
        tenPrint.context.fillRect(0, 0, tenPrint.canvas.width, tenPrint.canvas.height);
    },
    getRandomStrokeColor: () => {
        return tenPrint.cursor.colors[Math.floor(tenPrint.cursor.colors.length * Math.random())];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    tenPrint.init();
})