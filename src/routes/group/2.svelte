<script>
import EnglishText from "$lib/components/english_text.svelte";
import LearnerText from "$lib/components/learner_text.svelte";
import WhiteBtn from '$lib/components/buttons/styles/white_button.svelte'
import NameQuiz from '$lib/components/buttons/group/name_quiz.svelte'
import SoundQuiz from "$lib/components/buttons/group/sound_quiz.svelte";

// Group 2: c, k, d, e, h, r, m
</script>

<div class="outer-grid">
    <a href="/alphabet" class="back-button">
        <WhiteBtn>
            <div class="illustration"><img class="arrow" src="/images/icons/arrow_backward.svg" alt="arrow"></div></WhiteBtn>
    </a>
    <div class="learn-the-letters">
        <div class="english">
            <EnglishText key={"letters"}></EnglishText>
        </div>
        <LearnerText key={"letters"}></LearnerText>
    </div>

    <div class="row-1">
        <a class="c button" href="/letter/c"><WhiteBtn><div class="letter">c</div></WhiteBtn></a>
        <a class="k button" href="/letter/k"><WhiteBtn><div class="letter">k</div></WhiteBtn></a>
        <a class="d button" href="/letter/d"><WhiteBtn><div class="letter">d</div></WhiteBtn></a>
        <a class="e button" href="/letter/e"><WhiteBtn><div class="letter">e</div></WhiteBtn></a>
    </div>

    <div class="row-2">
        <a class="h button" href="/letter/h"><WhiteBtn><div class="letter">h</div></WhiteBtn></a>
        <a class="r button" href="/letter/r"><WhiteBtn><div class="letter">r</div></WhiteBtn></a>
        <a class="m button" href="/letter/m"><WhiteBtn><div class="letter">m</div></WhiteBtn></a>
    </div>

    <div class="practice-the-sounds">
        <div class="english">
            <EnglishText key={"pract_sound"}/>
        </div>
        <LearnerText key={"pract_sound"}/>
    </div>

    <a class="sound-test" href="/alphabet/group-2-sound-quiz">
        <SoundQuiz/>
    </a>

    <div class="practice-the-names">
        <div class="english">
            <EnglishText key={"pract_name"}/>
        </div>
        <LearnerText key={"pract_name"}/>
    </div>

    <a class="name-test" href="/alphabet/group-2-sound-quiz">
        <NameQuiz/>
    </a>
</div>

<style>
.outer-grid {
    place-items: center;

    display: grid;
    grid-template-rows: 50px 84px 21vw 21vw 84px 33vw 84px 33vw;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 22px;

    padding: 10px 10px 20px;
}

.back-button {
    grid-row: 1 / 2;
    grid-column: 1 / 2;

    width: 100%;
    height: 100%;

    /* padding-left: 10px; */
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

.learn-the-letters {
    grid-row: 2 / 3;
    grid-column: 1 / 4;   

    width: auto;
}

.button {
    width: 20vw;
    height: 20vw;
}

.letter {
    font-size: 13vw;
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

    width: 80%; 
    height: 100%;
}

.practice-the-names {
    grid-row: 7 / 8;
    grid-column: 1 / 4; 
        
    width: auto; 
}

.name-test {
    grid-row: 8 / 9;
    grid-column: 1 / 4;  

    width: 80%; 
    height: 100%;
}

.english {
    margin-bottom: 8px;
}
</style>