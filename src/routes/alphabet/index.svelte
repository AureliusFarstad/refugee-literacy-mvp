<script>
import { locale } from '$lib/data/stores/i18n';
import White from '$lib/components/buttons/styles/white_button.svelte'
import BigLanguageToggle from '$lib/components/language-toggle/big.svelte'
import EnglishText from '$lib/components/english_text.svelte';
import LearnerText from '$lib/components/learner_text.svelte';

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
            <div class="btn" class:active="{active}" on:click={pressSound}>
                <img class="teacher_icon" src="/images/icons/teacher_female.svg" alt="listen">
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
    display: grid;
    place-items: center;
    padding: 0px 15px;
    padding-top: 10px;
    grid-template-columns: 1fr 1fr 1fr; 
    grid-template-rows: 50px auto 70px 70px 70px auto;
    row-gap: 22px;
}

.back-button {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    height: 100%;
    width: 100%;
}
.illustration {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.arrow {
    position: absolute;   
    height: 110%;
}

.introduction {
    width: 100%;
    grid-row: 2 / 3;
    grid-column: 1 / 4;
    display: flex;
    justify-content: center;
}
.btn {
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    top: 0px;

    box-sizing: border-box;

    width: 50%;
    aspect-ratio: 1;

    box-shadow: 0px 6px 0px 0px #238031; /* #D7EAC3; */

    background-color: #EDFDEE;

    border-style: solid;
    border-width: 2px;
    border-color: #032436;
    border-radius: 50%;

    transition: all 0.6s ease-out;
}
.teacher_icon {
    height: 92%;
    width: auto;
    transform: translate(0%, 9%)
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

.group-1 {
    width: 100%;
    grid-row: 3 / 4;
    grid-column: 1 / 4;
}
.group-2 {
    width: 100%;
    grid-row: 4 / 5;
    grid-column: 1 / 4;
}
.group-3 {
    width: 100%;
    grid-row: 5 / 6;
    grid-column: 1 / 4;
}
</style>