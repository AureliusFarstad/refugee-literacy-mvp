<script>
export let book_title;
export let page_number;

let audio;
let active;

function pressSound() {
    if (active === true) {return}
    active = true
    audio.play()
    return
}
function audioEnded() {
    active = false
}

$: page_number && audioEnded()
</script>

<div class="btn" class:active="{active}" on:click={pressSound}>            
    <img class="illustration" src="/images/icons/person_countour_sparks_mouth.svg" alt="listen">
</div>

<audio
  style="display:none;"
  src="/audio/books/{book_title}/{page_number}.m4a"
  bind:this="{audio}"
  on:ended="{audioEnded}"
  volume="1"
  controls
><track kind="captions" /></audio>

<style>
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