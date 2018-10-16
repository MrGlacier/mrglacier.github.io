let crucialPoint = {
    config: {
        gravity: 0.1,
        velocity: 0.8,
        size: 8
    },
    canvas: null,
    context: null,
    points: [],
    init: () => {
        crucialPoint.canvas = document.getElementsByTagName('canvas')[0]
        crucialPoint.context = crucialPoint.canvas.getContext('2d')

        crucialPoint.canvas.width  = crucialPoint.canvas.getBoundingClientRect().width;
        crucialPoint.canvas.height = crucialPoint.canvas.getBoundingClientRect().height; 

        crucialPoint.canvas.style.width  = crucialPoint.canvas.getBoundingClientRect().width;
        crucialPoint.canvas.style.height = crucialPoint.canvas.getBoundingClientRect().height;

        crucialPoint.update()
    },
    update: () => {
        crucialPoint.clearCanvas()

        if (crucialPoint.points.length < 5) {
            if (crucialPoint.points.length == 0 || crucialPoint.points[crucialPoint.points.length - 1].created < Date.now() - 750) {
                crucialPoint.createPoint()
            }
        }

        for (pointIndex = 0; pointIndex < crucialPoint.points.length; ++pointIndex) {
            let currentPoint = crucialPoint.points[pointIndex];
            crucialPoint.updatePoint(currentPoint)

            if (currentPoint.position.x > crucialPoint.canvas.width || currentPoint.position.x < 0 || !currentPoint.alive) {
                crucialPoint.points.splice(pointIndex, 1);
                crucialPoint.createPoint();
            }
        }

        window.requestAnimationFrame(crucialPoint.update)
    },
    createPoint: () => {
        let point = {
            created: Date.now(),
            alive: true,
            position: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 0,
                y: 0
            },
        }
        crucialPoint.points.push(point)
        crucialPoint.reset(point)
    },
    reset: (currentPoint) => {
        currentPoint.position.x = crucialPoint.getRandomFloat(1, 10);
        currentPoint.position.y = 0;
        currentPoint.velocity.x = crucialPoint.getRandomFloat(0.5, 1);
        currentPoint.velocity.y = crucialPoint.getRandomFloat(0.5, 1);
    },
    updatePoint: (currentPoint) => {
        let oldPosition = currentPoint.position
        currentPoint.velocity.y += crucialPoint.config.gravity

        currentPoint.position.x += currentPoint.velocity.x
        currentPoint.position.y += currentPoint.velocity.y

        // bouncing
        if (currentPoint.position.y > crucialPoint.canvas.height - crucialPoint.config.size) {
            var audio = new Audio('sound.wav');
            audio.volume = 0.5
            audio.play();

            currentPoint.position.y = crucialPoint.canvas.height - crucialPoint.config.size;
            currentPoint.velocity.y *= -crucialPoint.config.velocity;
        }

        crucialPoint.drawPoint(currentPoint.position, oldPosition)
    },
    drawPoint: (pos) => {
        crucialPoint.context.fillStyle = '#2b2b2b'
        crucialPoint.context.fillRect(pos.x, pos.y, crucialPoint.config.size, crucialPoint.config.size)
    },
    clearCanvas: () => {
        crucialPoint.setBackground('#f2f2f2');
    },
    setBackground: (color) => {
        crucialPoint.context.fillStyle = color;
        crucialPoint.context.fillRect(0, 0, crucialPoint.canvas.width, crucialPoint.canvas.height);
    },
    getRandomFloat: (min, max) => {
        let float = parseFloat((Math.random() * (max - min) + min).toFixed(2))
        return float;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    crucialPoint.init();
});