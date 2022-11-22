<script context="module">
export async function load({ params }) {
    let noise = params.noise
    let group = params.group
    return { props: {
        noise: noise,
        group: group
    }}
}
</script>

<script>
import { fade } from 'svelte/transition';

import QUIZ_DATA from '$lib/data/combinations.json';

import EnglishText from "$lib/components/english_text.svelte";
import LearnerText from "$lib/components/learner_text.svelte";
import PersonSpeaking from "$lib/components/buttons/person_speaking.svelte"
import BouncingHand from '$lib/components/buttons/bouncing_hand.svelte';
import WhiteBtn from "$lib/components/buttons/styles/white_button.svelte";
import GreenBtn from '$lib/components/buttons/styles/green_button.svelte';
import GuessableLetter from '$lib/components/buttons/guessable_letter.svelte';

export let noise;
export let group;

// HTML Element Bindings
let speakerButton;
let speakerAudio;
let resultAudio;

// Quiz State Indicators
let speaker_active = false;
let freeze_input = true; // Between quiz rounds.
let speaker_played = false;
let point_out_speaker = false;

// Quiz Data
let possible_sets = QUIZ_DATA[group.toString()]
var set_of_options, correct_option, guessed_option

function selectRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function resetQuiz() {
    guessed_option = "";
    set_of_options = selectRandom(possible_sets);
    correct_option = selectRandom(set_of_options);
    freeze_input = false; speaker_played = false;
}
resetQuiz()

function pressSpeaker() {
    if (speaker_active || freeze_input) {return}
    speaker_played = true
    if (point_out_speaker) {
        point_out_speaker = false
    }
    speaker_active = true
    speakerAudio.src = `/alphabet/${noise}/${correct_option}.mp4`
    speakerAudio.play()
    return
}
function speakerEnded() {
    speaker_active = false
}

function guess(option) {
    if (freeze_input) {
        return
    } else if (!speaker_played) {
        point_out_speaker = true; return;
    }
    freeze_input = true
    if (speaker_active) {
        speakerAudio.pause()
        speaker_active = false
    }
    guessed_option = option
    if (guessed_option == correct_option) {
        resultAudio.src = "/audio/sound_effects/correct_tone.mp3"
    } else {
        resultAudio.src = "/audio/sound_effects/error_tone.mp3"
    }
    setTimeout(() => {
        resultAudio.play()
    }, 800);
    setTimeout(() => {
        resetQuiz()
        speakerButton.classList.add("animate-speaker")
    }, 3200);
    setTimeout(() => {
        speakerButton.classList.remove("animate-speaker")
    }, 4200);
}
</script>

<div class="upper-grid"> 
    <a href="/group/{group}" class="back-button">
        <WhiteBtn><div class="arrow-div"><img class="arrow" src="/images/icons/arrow_backward.svg" alt="arrow"></div></WhiteBtn>
    </a>

    <div class="help-audio-button">
        {#if noise == "sound"}
            <PersonSpeaking key={"match_sound"}/>
        {:else if noise == "name"}
            <PersonSpeaking key={"match_name"}/>
        {/if}
    </div>

    <div class="listen-english"><EnglishText key={"listen"} sound={false}/></div>
    <div class="listen-learner"><LearnerText key={"listen"} sound={false}/></div>

    {#if point_out_speaker}
        <div class="point-out-speaker" transition:fade> 
            <BouncingHand />
        </div>
    {/if}

    <div bind:this="{speakerButton}" class="speaker">
        <GreenBtn active={speaker_active}>
            <div class="center" on:click={pressSpeaker}>
                {#if noise == "sound"}
                    <img class="ear" src="/images/icons/ear-with-sparks-below.svg" alt="sound">
                {:else if noise == "name"}
                    <img class="nametag" src="/images/icons/name-tag.svg" alt="name">
                {/if}
            </div>
        </GreenBtn>
    </div>
</div>


<div class="lower-grid"> 
    <div class="select-english"><EnglishText key={"select"} sound={false} /></div>
    <div class="select-learner"><LearnerText key={"select"} sound={false} /></div>

    {#each set_of_options as option, i}
        <div class="letter-{i}" on:click={() => {guess(option)}}>
            <GuessableLetter {guessed_option} {correct_option} letter={option} />
        </div>
    {/each}
</div>

<audio
  style="display:none;"
  bind:this="{speakerAudio}"
  on:ended="{speakerEnded}"
  volume="1"
  controls
><track kind="captions" /></audio>

<audio
  style="display:none;"
  bind:this="{resultAudio}"
  on:ended="{() => {}}"
  volume="1"
  controls
><track kind="captions" /></audio>

<style>
.upper-grid { 
    position: fixed;
    top: 0px;

    display: grid;
    padding: 10px 12px 18px;
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 50px 24px 50px 12px 75vw;

    place-items: center;

    width: 100vw;
    height: auto;
}

.back-button {
    grid-row: 1 / 2;
    grid-column: 1 / 2;

    position: absolute;
    left: 0px;

    width: 130px;
    height: 100%;
}

.arrow-div {
    align-items: center;
    justify-content: center;

    display: flex;

    height: 100%;
}

.arrow {
    position: absolute;   

    height: 110%;
}

.help-audio-button {
    grid-row: 1 / 2;
    grid-column: 2 / 3;

    position: absolute;
    right: 10px;
}

.listen-english {
    grid-row: 3 / 4;
    grid-column: 1 / 2;  

    position: absolute;
    left: 0px;
    padding-left: 10px;
}

.listen-learner {
    grid-row: 3 / 4;
    grid-column: 2 / 3;   

    position: absolute;
    right: 0px;
    padding-right: 10px;
}

.point-out-speaker {
    grid-row: 4 / 5;
    grid-column: 1 / 4;

    position: relative;
    left: 20px;
    bottom: 17px;

    transform: scale(1.4);
}

.speaker {
    grid-row: 5 / 6;
    grid-column: 1 / 4;

    width: 75vw;
    height: 75vw;
}

@keyframes XAxisFlip {
 0%{
    transform: rotateX(0deg);
   }
100%{
    transform: rotateX(360deg);
   }
}

.animate-speaker {
    animation-name: XAxisFlip;
    animation-duration: 0.8s;
    animation-iteration-count: 1;
}

.center {
    width: 100%;
    height: 100%;

    display: flex; 
    align-items: center; 
    justify-content: center;
}

.nametag {
    display: block;
    position: absolute;   
    height: 75%;
    width: auto;
    transform: translate(0%, -4%);
}

.ear {
    display: block;
    position: absolute;   
    height: 75%;
    width: auto;
    transform: translate(0%, -2%);
}

.lower-grid { 
    position: fixed;
    bottom: 0px;

    display: grid;
    padding: 10px 12px 18px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; 
    grid-template-rows: 50px 12px 30vw 24px;

    place-items: center;

    width: 100vw;
    height: auto;
}

.select-english {
    grid-row: 1 / 2;
    grid-column: 1 / 4;   

    position: absolute;
    left: 0px;
    padding-left: 10px;
}

.select-learner {
    grid-row: 1 / 2;
    grid-column: 4 / 7;   

    position: absolute;
    right: 0px;
    padding-right: 10px;
}

.letter-0 {
    grid-row: 3 / 4;
    grid-column: 1 / 3;

    height: 100%;
    width: 100%;

    padding-right: 12px;
}

.letter-1 {
    grid-row: 3 / 4;
    grid-column: 3 / 5;

    height: 100%;
    width: 100%;

    padding-left: 6px;
    padding-right: 6px;
}

.letter-2 {
    grid-row: 3 / 4;
    grid-column: 5 / 7;

    height: 100%;
    width: 100%;

    padding-left: 12px;
}
</style>