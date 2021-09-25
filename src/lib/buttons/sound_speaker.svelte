<script>
    import Green from './styles/green_button.svelte';

    export let noise;
    export let letter;

    let audio;
    let active;
    let svg;

    function pressSound() {
        if (active === true) {return}
        active = true
        let source = `/alphabet/${noise}/${letter}.mp4`
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
        {#if noise == "sound"}
            <img class="ear" src="/images/icons/ear-with-sparks-below.svg" alt="sound">
        {:else if noise == "name"}
            <img class="nametag" src="/images/icons/name-tag.svg" alt="name">
        {/if}
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
.nametag {
    display: block;
    position: absolute;   
    height: 75%;
    width: auto;
    transform: translate(0%, -4%);
}
.ear {
    display: block;
    position: absolute;   
    height: 75%;
    width: auto;
    transform: translate(0%, -2%);
}

</style>