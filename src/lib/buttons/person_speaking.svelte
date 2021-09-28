<script>
    import { locale } from "$lib/stores/i18n";
    export let key = "";
    export let eng = false;
    let active;
    let audio;

    function pressSound() {
        if (active === true) {return}
        active = true
        let source
        if (eng) {
            source = `/audio/spoken_text/en/${key}.m4a`
        }
        else {
            source = `/audio/spoken_text/${$locale}/${key}.m4a`
        }
        audio.src = source
        audio.play()
        return
    }
    function audioEnded() {
        active = false
    }
</script>

<div class="btn" class:active="{active}" on:click={pressSound}>            
    <img class="illustration" src="/images/icons/person_countour_sparks_mouth.svg" alt="listen">
</div>

<audio
  style="display:none;"
  bind:this="{audio}"
  on:ended="{audioEnded}"
  volume="1"
  controls
><track kind="captions" /></audio>

<style>
.btn {
    display: flex;
    align-items: center;

    position: relative;
    top: 0px;

    box-sizing: border-box;

    width: 40px;
    height: 40px;

    box-shadow: 0px 4px 0px 0px #238031; /* #D7EAC3; */

    background-color: #EDFDEE;

    border-style: solid;
    border-width: 1.7px;
    border-color: #032436;
    border-radius: 20px;

    transition: all 0.6s ease-out;
}
.illustration {
    width: 80%;
    height: auto;
    transform: translate(4px, 3px)
}

.active {
    position: relative;
    top: 6px;
    box-shadow: 0px 2px 0px 0px #60a83d;
    border:4px solid #fffd72;
    transition: all 0.6s ease-out;
    /* transition: all 2s ease-in-out 0s 1 forward both; */
    /*  border 0.5s ease-in-out 1s 1 forward both; */
}
</style>