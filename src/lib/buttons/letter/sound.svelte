<script>
    export let letter;
    import { t, locale, locales } from "$lib/stores/i18n";
    import Yellow from '../styles/yellow_button.svelte';
    let audio;
    let active;

    function pressSound() {
        if (active === true) {return}
        active = true
        let source = "audio/letter/" + letter.toString() + "_sound.mp4"
        console.log(source)
        audio.src = source
        audio.play()
        return
    }
    function audioEnded() {
        active = false
    }
</script>

<Yellow {active}>
    <div class="grid" on:click={pressSound}>
        <div class="text">{$t("button.sound")}</div>
        <div class="picture"><img class="illustration" src="/images/ear.svg" alt="ear"></div>
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
.grid > div {
    text-align: center;
}
.illustration {
    display: block;
    position: absolute;
    top: 50%;
    height: 80%;
    width: auto;
    transform: translate(-50%, -50%);
}
.grid {
    height: 100%;
    display: grid;
    place-items: center;
    grid-template-columns: 2fr 1fr; 
}
</style>