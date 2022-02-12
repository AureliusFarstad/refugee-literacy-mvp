<script>
    import {t, locale, locales} from "$lib/data/stores/i18n"
    let audio;

    function setFa() {
        locale.set('fa')
        if (!audio.paused) {
            audio.pause()
        }
        audio.src = "/audio/spoken_text/farsi.m4a"
        audio.play()
    }
    function setFu() {
        locale.set('fu')
        if (!audio.paused) {
            audio.pause()
        }
        audio.src = "/audio/spoken_text/fusha.m4a"
        audio.play()
    }
    function setSh() {
        locale.set('sh')
        if (!audio.paused) {
            audio.pause()
        }
        audio.src = "/audio/spoken_text/shami.m4a"
        audio.play()
    }

</script>

<div class="grid">
    <div class="farsi text" class:selected="{$locale==='fa'}" on:click={setFa}>فارسی</div> 
    <div class="fusha text" class:selected="{$locale==='fu'}" on:click={setFu}>العربية الفصحى</div>
    <div class="shami text" class:selected="{$locale==='sh'}" on:click={setSh}>العربيه العاميه</div>
</div>

<audio
  style="display:none;"
  bind:this="{audio}"
  volume="1"
  controls
><track kind="captions" /></audio>

<style>
    .grid {
        width: 280px;
        display: grid;
        grid-template-columns: auto;
        background-color: #EDFDEE;
        grid-template-rows: 60px 60px;
        border-color: #238031;
        border-radius: 10px;
        border-style: solid;
        border-width: 4px;
        padding: 8px;
    }
    .selected {
        background-color: #238031;
        color: #EDFDEE !important;
        border-style: solid;
        border-radius: 6px;
        border-color: #238031;
        height: 60px;
    }
    .text {
        font-family: Tahoma, Helvetica;
        color: #238031;
        font-size: 36px;
        text-align: right;
        line-height: 60px;
        padding-right: 8px;
    }
    .farsi {
        direction: rtl;
    }
    .fusha {
        direction: rtl;
    }
    .shami {
        direction: rtl;
    }
</style>