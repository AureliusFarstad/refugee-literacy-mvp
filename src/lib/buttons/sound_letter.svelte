<script>
    import Yellow from './styles/yellow_button.svelte';

    export let pressed;
    export let letter;

    let active;
    $: if (letter === pressed) {
        active = true
    } 
    $: if (letter !== pressed) {
        active = false
    }

    let audio;
    let audio_source = "audio/letter/" + letter.toString() + "_sound.mp4"

    function pressSound() {
        console.log(audio_source)
        audio.src = audio_source
        audio.play()
    }

    function audioEnded() {
        console.log("audio finished")
    }
</script>
<Yellow {active}>
    <div class="center" on:click={pressSound}>
        {letter}
    </div>
</Yellow>

<audio
  style="display:none;"
  bind:this="{audio}"
  on:ended="{audioEnded}"
  volume="0.8"
  controls
><track kind="captions" /></audio>
<style>
.center {
    display: flex; 
    align-items: center; 
    justify-content: center;
}
</style>