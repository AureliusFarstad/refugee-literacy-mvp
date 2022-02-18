<script>
import { locale } from '$lib/data/stores/i18n';
import White from '$lib/components/buttons/styles/white_button.svelte'

let active;
let audio;
function pressSound() {
    if (active === true) {return}
    active = true
    let source = `/audio/spoken_text/${$locale}/satpin_expl.m4a`
    audio.src = source
    audio.play()
    return
}
function audioEnded() {
    active = false
}
</script>

<body>
    <div class="outer-grid">
        <a href="/browse" class="back-button">
            <White><div class="illustration"><img class="arrow" src="/images/icons/arrow_backward.svg" alt="arrow"></div></White>
        </a>
        <div class="introduction">
            <div class="teacher-btn" class:active="{active}" on:click={pressSound}>
                <img class="teacher-icon" src="/images/icons/teacher_female.svg" alt="listen">
            </div>
            <audio
                style="display:none;"
                bind:this="{audio}"
                on:ended="{audioEnded}"
                volume="1"
                controls
            ><track kind="captions" /></audio>
        </div>
        <a class="group-1" href="group/1">
            <White>s a t p i n</White>
        </a>
        <a class="group-2" href="group/2">
            <White>c k e h r m d</White>
        </a>
        <a class="group-3" href="group/3">
            <White>g o u l f b</White>
        </a>

    </div>
</body>

<style>
.outer-grid { 
    place-items: center;

    display: grid;
    grid-template-rows: 50px auto 70px 70px 70px auto;
    grid-template-columns: 1fr 1fr 1fr; 
    row-gap: 22px;

    padding: 10px 15px 0;
}

.back-button {
    grid-row: 1 / 2;
    grid-column: 1 / 2;

    height: 100%;
    width: 100%;
}

.illustration {
    align-items: center;
    justify-content: center;

    display: flex;

    height: 100%;
}

.arrow {
    position: absolute;  

    height: 110%;
}

.introduction {
    grid-row: 2 / 3;
    grid-column: 1 / 4;
    justify-content: center;

    display: flex;

    width: 100%;
}

.teacher-btn {
    position: relative;
    top: 0px;
    align-items: center;
    justify-content: center;

    display: flex;

    transition: all 0.6s ease-out;

    box-shadow: 0px 6px 0px 0px #238031;
    border-style: solid;
    border-width: 2px;
    border-color: #032436;
    border-radius: 50%;
    width: 170px;
    height: 170px;

    background-color: #EDFDEE;
}

.teacher-icon {
    transform: translate(0%, 9%);

    width: auto;
    height: 92%;
}

.active {
    position: relative;
    top: 6px;

    transition: all 0.6s ease-out;

    box-shadow: 0px 2px 0px 0px #60a83d;
    border:4px solid #fffd72;
}

.group-1 {
    grid-row: 3 / 4;
    grid-column: 1 / 4;

    width: 100%;
}

.group-2 {
    grid-row: 4 / 5;
    grid-column: 1 / 4;

    width: 100%;
}

.group-3 {
    grid-row: 5 / 6;
    grid-column: 1 / 4;

    width: 100%;
}
</style>