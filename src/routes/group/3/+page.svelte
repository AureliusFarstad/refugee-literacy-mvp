<script>
import EnglishText from "$lib/components/english_text.svelte";
import LearnerText from "$lib/components/learner_text.svelte";
import White from '$lib/components/buttons/styles/white_button.svelte'
import NameQuiz from '$lib/components/buttons/group/name_quiz.svelte'
import SoundQuiz from "$lib/components/buttons/group/sound_quiz.svelte";

// Group 4: g, o, u, l, f, b
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
        <a class="g button" href="/letter/g"><White><div class="letter">g</div></White></a>
        <a class="o button" href="/letter/o"><White><div class="letter">o</div></White></a>
        <a class="u button" href="/letter/u"><White><div class="letter">u</div></White></a>
    </div>
    <div class="row-2">
        <a class="l button" href="/letter/l"><White><div class="letter">l</div></White></a>
        <a class="f button" href="/letter/f"><White><div class="letter">f</div></White></a>
        <a class="b button" href="/letter/b"><White><div class="letter">b</div></White></a>
    </div>


    <div class="practice-the-sounds">
        <div class="english">
            <EnglishText key={"pract_sound"}></EnglishText>
        </div>
        <LearnerText key={"pract_sound"}></LearnerText>
    </div>

    <a class="sound-test" href="/alphabet/group-3-sound-quiz">
        <SoundQuiz/>
    </a>

    <div class="practice-the-names">
        <div class="english">
            <EnglishText key={"pract_name"}></EnglishText>
        </div>
        <LearnerText key={"pract_name"}></LearnerText>
    </div>

    <a class="name-test" href="/alphabet/group-3-name-quiz">
        <NameQuiz/>
    </a>
</div>

<style>
.outer-grid { 
    display: grid;

    grid-template-rows: 50px 84px 21vw 21vw 84px 120px 84px 120px;
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

@media (min-width: 1000px) {
    .outer-grid { 
        grid-template-rows: 50px 84px 120px 120px 84px 120px 84px 120px;
    }

    .button { 
        width: 100%;
        height: 100%;
    }

    .letter {
        position: relative; 
        top: -10px;

        font-size: 80px;
    }
}
</style>