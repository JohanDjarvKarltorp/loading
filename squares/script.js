let runtime = 500;
delaytime = 200;

window.onload = () => {
    go();
}

let go = () => {
    let squares = document.getElementsByClassName("square");
    showSquares(squares);
    setTimeout(() => {
        hideSquares(squares);
    }, runtime * 3 + delaytime * 3);
}


let runAnimation = (square, nextSquare, displayValue, topValue, leftValue, restart = false) => {
    let animation = square.animate(square.keyframes, square.animProps);

    animation.addEventListener('finish', () => {
        square.style.top = topValue;
        square.style.left = leftValue;
        nextSquare.style.display = displayValue;
        if (restart) {
            setTimeout(function() {
                go();
            }, delaytime);
        }
    });
}

let showSquares = (squares) => {

    // move square 2
    squares[1].style.display = "block";
    new animation(squares[1], "0%", "51%", runtime, 0);
    runAnimation(squares[1], squares[2], "block", "0%", "51%");

    // move square 3

    new animation(squares[2], "51%", "51%", runtime, runtime + delaytime);
    runAnimation(squares[2], squares[3], "block", "51%", "51%");

    // move square 4

    new animation(squares[3], "51%", "0%", runtime, runtime * 2 + delaytime * 2);
    runAnimation(squares[3], squares[3], "block", "51%", "0");
}

let hideSquares = (squares) => {

    // move square 1

    new animation(squares[0], "0%", "51%", runtime, 0);
    runAnimation(squares[0], squares[1], "none", "0%", "51%");

    // move square 1 and reset square 2
    setTimeout(() => {
        new animation(squares[0], "51%", "51%", runtime, 0);
        runAnimation(squares[0], squares[2], "none", "51%", "51%");

        squares[1].style.top = "0%";
        squares[1].style.left = "0%";

    }, runtime + delaytime);

    // move square 1 and reset square 3
    setTimeout(() => {
        new animation(squares[0], "51%", "0%", runtime, 0);
        runAnimation(squares[0], squares[3], "none", "51%", "0");

        squares[2].style.top = "0";
        squares[2].style.left = "51%";
    }, runtime * 2 + delaytime * 2);

    // move square 1 and reset square 4
    setTimeout(() => {
        new animation(squares[0], "0%", "0%", runtime, 0);
        runAnimation(squares[0], squares[0], "block", "0", "0", true);

        squares[3].style.top = "51%";
        squares[3].style.left = "51%";

    }, runtime * 3 + delaytime * 3);
}


class animation {
    constructor(div, topValue, leftValue, durationValue, delayValue) {
        this.div = div;
        this.div.keyframes = [{
            top: window.getComputedStyle(this.div).top,
            left: window.getComputedStyle(this.div).left
        }, {
            top: topValue,
            left: leftValue
        }];

        this.div.animProps = {
            duration: durationValue,
            delay: delayValue,
            iterations: 1
        }
    }
}
