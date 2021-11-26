<script>
    import {t, locale, locales} from "$lib/stores/i18n"
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
    <div class="farsi toggle" class:selected="{$locale==='fa'}" on:click={setFa}>فارسی</div> 
    <div class="fusha toggle" class:selected="{$locale==='fu'}" on:click={setFu}>العربية الفصحى</div>
    <div class="shami toggle" class:selected="{$locale==='sh'}" on:click={setSh}>العربيه العاميه</div>
</div>

<audio
  style="display:none;"
  bind:this="{audio}"
  volume="1"
  controls
><track kind="captions" /></audio>

<style>
    .grid {
        width: 100vw;
        display: grid;
        grid-template-columns: auto;
        background-color: rgb(255, 255, 230);
        grid-template-rows: auto auto auto;
        grid-row-gap: 14px;
        padding: 22px 14px;
    }
    .selected {
        border-color: #33b647 !important;;
        background-color: rgb(238, 238, 210) !important;;
        color: #238031 !important;
        box-shadow: -2px -3px 5px 0 hsla(0, 0%, 85.1%, -0.34),
      2px 6px 8px 0 rgba(0, 0, 0, 0.35);

    }
    .toggle {
        font-family: Tahoma, Helvetica;
        color:black;
        background-color: rgb(238, 238, 210);
        border-color: rgb(214, 214, 191);
        font-size: 36px;
        text-align: right;
        line-height: 60px;
        padding-right: 8px;
        border-radius: 10px;
        border-style: solid;
        border-width: 4px;
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