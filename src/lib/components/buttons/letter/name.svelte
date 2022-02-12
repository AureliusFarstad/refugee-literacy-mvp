<script>
    export let letter;
    import { t, en, locale, locales } from "$lib/data/stores/i18n";
    import Yellow from '$lib/components/buttons/styles/yellow_button.svelte';
    let audio;
    let active;

    function pressSound() {
        if (active === true) {return}
        active = true
        let source = "/alphabet/name/" + letter.toString() + ".mp4"
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
        <div class="english">{en("name")}</div>
        <div class="picture"><img class="illustration" src="/images/icons/name-tag.svg" alt="ear"></div>
        <div class="mothertongue">{$t("name")}</div>
    </div>
</Yellow>

<audio
  style="display:none;"
  bind:this="{audio}"
  on:ended="{audioEnded}"
  volume="1"
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
    height: 100%;
    width: auto;
    transform: translate(-50%, -50%);
}
.grid {
    height: 100%;
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr 1fr; 
}
</style>