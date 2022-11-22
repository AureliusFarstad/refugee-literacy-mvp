<script>
import EnglishText from "$lib/components/english_text.svelte";
import LearnerText from "$lib/components/learner_text.svelte";
import White from '$lib/components/buttons/styles/white_button.svelte'
import NameQuiz from '$lib/components/buttons/group/name_quiz.svelte'
import SoundQuiz from "$lib/components/buttons/group/sound_quiz.svelte";

// Group 1: s, a, t, p, i, n
</script>

<div class="outer-grid">
    <a href="/alphabet" class="back-button">
        <White><div class="illustration"><img class="arrow" src="/images/icons/arrow_backward.svg" alt="arrow"></div></White>
    </a>
    <div class="learn-the-letters">
        <div class="english">
            <EnglishText key={"letters"}></EnglishText>
        </div>
        <LearnerText key={"letters"}></LearnerText>
    </div>


    <div class="row-1">
        <a class="s button" href="/letter/s"><White><div class="letter">s</div></White></a>
        <a class="a button" href="/letter/a"><White><div class="letter">a</div></White></a>
        <a class="t button" href="/letter/t"><White><div class="letter">t</div></White></a>
    </div>
    <div class="row-2">
        <a class="p button" href="/letter/p"><White><div class="letter">p</div></White></a>
        <a class="i button" href="/letter/i"><White><div class="letter">i</div></White></a>
        <a class="n button" href="/letter/n"><White><div class="letter">n</div></White></a>
    </div>


    <div class="practice-the-sounds">
        <div class="english">
            <EnglishText key={"pract_sound"}></EnglishText>
        </div>
        <LearnerText key={"pract_sound"}></LearnerText>
    </div>

    <a class="sound-test" href="/alphabet/group-1-sound-quiz">
        <SoundQuiz/>
    </a>

    <div class="practice-the-names">
        <div class="english">
            <EnglishText key={"pract_name"}></EnglishText>
        </div>
        <LearnerText key={"pract_name"}></LearnerText>
    </div>

    <a class="name-test" href="/alphabet/group-1-name-quiz">
        <NameQuiz/>
    </a>
</div>

<style>
.outer-grid { 
    display: grid;

    grid-template-rows: 50px 84px 21vw 21vw 84px 33vw 84px 33vw;
    grid-template-columns: 1fr 1fr 1fr; 
    grid-row-gap: 22px;

    place-items: center;

    padding: 10px 10px 20px;
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

.learn-the-letters {
    width: auto;
    grid-row: 2 / 3;
    grid-column: 1 / 4;   
}

.button {
    width: 20vw;
    height: 20vw;
}

.letter {
    font-size: 13vw;
    position: relative; 
    top: -2px;
}


.row-1 {
    grid-row: 3 / 4;
    grid-column: 1 / 4;

    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    column-gap: 1em;

    width: 100%;
    height: 100%;
}

.row-2 {
    grid-row: 4 / 5;
    grid-column: 1 / 4;

    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    column-gap: 1em;

    width: 100%;
    height: 100%;
}

.practice-the-sounds {
    grid-row: 5 / 6;
    grid-column: 1 / 4;     
    width: auto; 
}

.sound-test {
    grid-row: 6 / 7;
    grid-column: 1 / 4;  
    height: 100%;
    width: 80%; 
}

.practice-the-names {
    grid-row: 7 / 8;
    grid-column: 1 / 4;  
    width: auto; 
}

.english {
    margin-bottom: 8px;
}

.name-test {
    grid-row: 8 / 9;
    grid-column: 1 / 4;  
    height: 100%;
    width: 80%; 
}
</style>