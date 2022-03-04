<script>
    export let letter;
    export let uppercase = false;

    let svgSrc = `/alphabet/lowercase/${letter}.svg`
    if (uppercase) {
        svgSrc = `/alphabet/uppercase/${letter}.svg`
    }

    let svgEl

    var distancePerPoint = 2;
    var drawFPS          = 60;

    export function animate(){
        let svg = svgEl.getSVGDocument();
        var paths = svg.querySelectorAll('path');//, length, timer;

        var pathCount = paths.length
        var pathLengths = Array(pathCount)
        var lengths = Array(pathCount)
        var timers = Array(pathCount)

        let timeout = 0;

        function increaseLength(j){
            lengths[j] += distancePerPoint;
            paths[j].style.strokeDasharray = [lengths[j],pathLengths[j]].join(' ');
            if (lengths[j] >= pathLengths[j]) {
                clearInterval(timers[j]);
            }
        }

        for (let i = 0; i < paths.length; i++) {
            lengths[i] = 0
            pathLengths[i] = paths[i].getTotalLength();

            paths[i].style.visibility = "hidden"

            setTimeout(() => {
                timers[i] = setInterval(() => {increaseLength(i)}, 1000/drawFPS);
                setTimeout(() => {paths[i].style.visibility = "visible"}, 1000/drawFPS);
            }, timeout);

            timeout += (1000/drawFPS) * (pathLengths[i]/distancePerPoint)
        }
    }
</script>

<object bind:this={svgEl} type="image/svg+xml" data={svgSrc} class="letter-svg" title="letter">
    {letter}
</object>

<style>
    .letter-svg {
        height: 100%;
        z-index: 100;
    }
</style>