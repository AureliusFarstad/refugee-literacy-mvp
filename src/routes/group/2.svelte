<script>
    import { t, locale, locales } from "$lib/data/stores/i18n";

    import EnglishText from "$lib/components/english_text.svelte";
    import LearnerText from "$lib/components/learner_text.svelte";
    import White from '$lib/components/buttons/styles/white_button.svelte'
    import SvgLetter from "$lib/components/svg_letter.svelte";
    import NameQuiz from '$lib/components/buttons/group/name_quiz.svelte'
    import SoundQuiz from "$lib/components/buttons/group/sound_quiz.svelte";

import { group_outros } from "svelte/internal";
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
        <a class="c" href="/letter/c"><White><div class="letter">c</div></White></a>
        <a class="k" href="/letter/k"><White><div class="letter">k</div></White></a>
    </div>

    <a class="e button" href="/letter/e"><White><div class="letter">e</div></White></a>
    <a class="h button" href="/letter/h"><White><div class="letter">h</div></White></a>
    <a class="r button" href="/letter/r"><White><div class="letter">r</div></White></a>

    <div class="row-2">
        <a class="m" href="/letter/m"><White><div class="letter">m</div></White></a>
        <a class="d" href="/letter/d"><White><div class="letter">d</div></White></a>
    </div>

    <div class="practice-the-sounds">
        <div class="english">
            <EnglishText key={"pract_sound"}></EnglishText>
        </div>
        <LearnerText key={"pract_sound"}></LearnerText>
    </div>

    <a class="sound-test" href="/practice/sound-group-2">
        <SoundQuiz/>
    </a>

    <div class="practice-the-names">
        <div class="english">
            <EnglishText key={"pract_name"}></EnglishText>
        </div>
        <LearnerText key={"pract_name"}></LearnerText>
    </div>

    <a class="name-test" href="/practice/name-group-2">
        <NameQuiz/>
    </a>
</div>

<style>
    .outer-grid { 
        display: grid;
        padding: 0px 15px;
        grid-template-columns: 1fr 1fr 1fr; 
        grid-template-rows: 50px 84px 27vw 27vw 27vw 84px 33vw 84px 33vw;
        grid-gap: 22px;
        place-items: center;
        padding-top: 10px;
        padding-bottom: 20px;
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
        width: 100%;
        aspect-ratio: 1;
    }
    .letter {
        font-size: 13vw;
    }

    .row-1 {
        grid-row: 3 / 4;
        grid-column: 1 / 4;
        width: 100%;
        height: 100%;
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        gap: 22px;
    }
    .c {
        height: 100%;
        aspect-ratio: 1;
    }
    .k {
        height: 100%;
        aspect-ratio: 1;
    }

    .e {
        grid-row: 4 / 5;
        grid-column: 1 / 2;
    }
    .h {
        grid-row: 4 / 5;
        grid-column: 2 / 3;
    }
    .r {
        grid-row: 4 / 5;
        grid-column: 3 / 4;
    }

    .row-2 {
        grid-row: 5 / 6;
        grid-column: 1 / 4;
        width: 100%;
        height: 100%;
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        gap: 22px;
    }
    .m {
        height: 100%;
        aspect-ratio: 1;
    }
    .d {
        height: 100%;
        aspect-ratio: 1;
    }

    .practice-the-sounds {
        grid-row: 6 / 7;
        grid-column: 1 / 4;     
        width: auto; 
    }

    .sound-test {
        grid-row: 7 / 8;
        grid-column: 1 / 4;  
        height: 100%;
        width: auto; 
        aspect-ratio: 2;
    }

    .practice-the-names {
        grid-row: 8 / 9;
        grid-column: 1 / 4;  
        width: auto; 
    }

    .english {
        margin-bottom: 8px;
    }

    .name-test {
        grid-row: 9 / 10;
        grid-column: 1 / 4;  
        height: 100%;
        width: auto; 
        aspect-ratio: 2;
    }
    </style>