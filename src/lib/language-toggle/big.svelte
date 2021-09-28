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
    function setAr() {
        locale.set('ar')
        if (!audio.paused) {
            audio.pause()
        }
        audio.src = "/audio/spoken_text/arabic.m4a"
        audio.play()
    }

</script>

<div class="grid">
    <!-- <div class="english" on:click="{$locale='en'}">English</div> -->
    <div class="farsi text" class:selected="{$locale==='fa'}" on:click={setFa}>فارسی</div> 
    <div class="arabic text" class:selected="{$locale==='ar'}" on:click={setAr}>عَرَبِيّ</div>
    <!-- سوريه -->
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
        /* border-width: 4px; */
    }
    .text {
        font-family: Tahoma, Helvetica;
        color: #238031; /* seashell; */
        font-size: 36px;
        text-align: right;
        line-height: 60px;
        padding-right: 8px;
    }
    .farsi {
        direction: rtl;
    }
    .arabic {
        direction: rtl;
    }
</style>