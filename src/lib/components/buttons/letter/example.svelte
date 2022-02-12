<script>
    export let letter;
    import { t, locale, locales } from "$lib/data/stores/i18n";
    import Yellow from '$lib/components/buttons/styles/yellow_button.svelte';
    let audio;
    let active;

    function pressSound() {
        if (active === true) {return}
        active = true
        let source = "alphabet/sound/" + letter.toString() + ".mp4"
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
        <div class="text">{$t("example")}</div>
        <span class="symbol"></span>
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
.grid {
    display: grid;
    place-items: center;
    grid-template-columns: 2fr 1fr; 
}
</style>