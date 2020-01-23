let runtime = 1200;

window.onload = () => {
    go();
}

let go = async () => {
    let dot = document.getElementsByClassName("dot");
    dot = dot[0];
    start(dot);
}

let start = (dot) => {

    dot.keyframes = [{
        transform: `rotate(0deg) translateX(378.5%)`
    }, {
        transform: `rotate(360deg) translateX(378.5%)`
    }];

    dot.animProps = {
        duration: runtime,
        iterations: Infinity,
        easing: 'ease-in-out'
    }

    dot.animate(dot.keyframes, dot.animProps);
}

let sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}