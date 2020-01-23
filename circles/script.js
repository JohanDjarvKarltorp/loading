let runtime = 250;

window.onload = () => {
    go();
}

let go = async () => {
    let circles = document.getElementsByClassName("circle");
    circles = [circles[0], circles[1], circles[2], circles[3], circles[4]];
    let first = circles[0];
    let old = { deg: '0deg', x: '0px' };

    startFirstCircle(first);

    while (true) {
        rotatingCircles(circles, '-180deg', old, '120px');
        old = { deg: '-180deg', x: '120px' };
        await sleep(runtime * 5);

        circles.reverse();
        circles.splice(circles.indexOf(first), 1);
        circles.unshift(first);

        rotatingCircles(circles, '-360deg', old, '0px');
        old = { deg: '0deg', x: '0px' };
        await sleep(runtime * 5);

        circles.reverse();
        circles.splice(circles.indexOf(first), 1);
        circles.unshift(first);
    }
}

let rotatingCircles = async (circles, rotation, old, x) => {
    for (var i = 1; i < circles.length; i++) {
        circles[i].keyframes = [{
            transform: `rotate(${old.deg}) translateX(${old.x})`
        }, {
            transform: `rotate(${rotation}) translateX(${x})`
        }];

        circles[i].animProps = {
            duration: runtime,
            iterations: 1,
            delay: 150,
            easing: 'ease-in-out'
        }

        let animation = circles[i].animate(circles[i].keyframes, circles[i].animProps);

        animation.addEventListener('finish', (event) => {
            event.srcElement.effect.target.style.transform = `rotate(${rotation}) translateX(${x})`;
            //event.srcElement.effect.target.style.boxShadow =
        });

        await sleep(runtime);
    }
}

let startFirstCircle = (circle) => {

    circle.keyframes = [{
        left: window.getComputedStyle(circle).left
    }, {
        left: '70%'
    }]

    circle.animProps = {
        duration: runtime * 5,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'cubic-bezier(.50, 0, .50, 1)'
    }

    circle.animate(circle.keyframes, circle.animProps);
}

let sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}