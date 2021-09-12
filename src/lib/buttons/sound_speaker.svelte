<script>
// import { audio_paused } from 'src/stores/audio';
    import Green from './styles/green_button.svelte';

    export let letter;

    let audio;
    let active;
    let svg;

    function pressSound() {
        console.log("yessir")
        if (active === true) {return}
        active = true
        svg.setAttribute("fill", "red")
        let source = "audio/letter/" + letter.toString() + "_sound.mp4"
        console.log(source)
        audio.src = source
        audio.play()
        return
    }

    function audioEnded() {
        console.log("audio finished")
        active = false
    }

</script>
<Green {active}>
    <div class="center" class:selected="{active}" on:click={pressSound}>
        <object on:click={pressSound} bind:this={svg} class="illustration" class:selected="{active}" data="/images/speaker2.svg" type="image/svg+xml" title="speaker"></object> 
        <!-- <img bind:this={svg} class:selected="{active}" class="illustration" src="/images/speaker2.svg" alt="ear"> -->
    </div>
</Green>

<audio
  style="display:none;"
  bind:this="{audio}"
  on:ended="{audioEnded}"
  volume="0.8"
  controls
><track kind="captions" /></audio>
<style>
.center {
    width: 100%;
    height: 100%;
    display: flex; 
    align-items: center; 
    justify-content: center;
}
.illustration{
    display: block;
    position: absolute;
    height: 90%;
    width: auto;
    transform: translate(8%, 5%);
}
.selected g path{
  fill:Yellow;
  stroke: Yellow;
}

</style>