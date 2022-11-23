<script>
export let book_title;
export let page_number;

let audio;
let active;
// let audio_playing;

// $: {
//     src = `/audio/books/${book_title}/${page_number}.m4a`;
//     audio.pause()
//     audio.src = src;
// }
// function pauseAudio() {
//     audio.pause()
// }

let realsrc
let beforeplay = false
let afterplay = false

function pressSound() {
    realsrc = audio.src
    if (active === true) {return}
    active = true
    beforeplay = true;
    audio.play()
    afterplay = true;
    return
}

let canplay=false;
let canplaythrough=false;
let loadeddata=false;

function audioEnded() {
    realsrc = audio.src
    active = false;
    canplay=false;
    canplaythrough=false;
    loadeddata=false;
    beforeplay=false;
    afterplay=false;
}

function myOnCanPlayFunction() {
    canplay=true;
}
function myOnCanPlayThroughFunction() {
    canplay=true;
}
function myOnLoadedFunction() {
    loadeddata=true;
}
</script>

<div class="btn" class:active="{active}" on:click={pressSound}>            
    <img class="illustration" src="/images/icons/person_countour_sparks_mouth.svg" alt="listen">
</div>

<div class="top">
    <div>1. {`/audio/books/${book_title}/${page_number}.m4a`}</div>
    {#if audio && audio.src}
    <div class="smalltext">2. {realsrc}</div>
    {/if}
    {#if canplay}
    <div>3. canplay</div>
    {/if}
    {#if canplaythrough}
    <div>4. canplaythrough</div>
    {/if}
    {#if loadeddata}
    <div>5. loadeddata</div>
    {/if}
    <div>6. {active}</div>
    <div>7. {beforeplay}</div>
    <div>8. {afterplay}</div>

</div>


<audio
  oncanplay="{myOnCanPlayFunction()}"
  oncanplaythrough="{myOnCanPlayThroughFunction()}"
  onloadeddata="{myOnLoadedFunction()}"
  style="display:none;"
  src="/audio/books/{book_title}/{page_number}.m4a"
  bind:this="{audio}"
  on:ended="{audioEnded}"
  volume="1"
  controls
><track kind="captions" /></audio>

<style>
.top {
    position: fixed;
    width: inherit;
    max-width: inherit;
    top: 100px;
    left: 0px;
}
.smalltext {
    font-size: 10px;
}
.btn {
    position: relative;
    top: 0px;
    align-items: center;

    display: flex;

    transition: all 0.6s ease-out;

    box-shadow: 0px 4px 0px 0px #238031;
    border: 1.7px solid #032436;
    border-radius: 50%;
    width: 100%;
    height: 100%;

    background-color: #EDFDEE;
}

.illustration {
    transform: translate(24%, 4px);

    width: 70%;
    height: auto;
}

.active {
    position: relative;
    top: 6px;

    transition: all 0.6s ease-out;

    box-shadow: 0px 2px 0px 0px #60a83d;
    border:4px solid #fffd72;
}
</style>