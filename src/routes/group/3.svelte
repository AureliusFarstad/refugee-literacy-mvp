<script>
    import { t, locale, locales } from "$lib/stores/i18n";

    import EnglishText from "$lib/english_text.svelte";
    import LearnerText from "$lib/learner_text.svelte";
    import White from '$lib/buttons/styles/white_button.svelte'
    import SvgLetter from "$lib/svg_letter.svelte";
    import NameQuiz from '$lib/buttons/group/name_quiz.svelte'
    import SoundQuiz from "$lib/buttons/group/sound_quiz.svelte";

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

    <a class="g button" href="/letter/g"><White><div class="letter">g</div></White></a>
    <a class="o button" href="/letter/o"><White><div class="letter">o</div></White></a>
    <a class="u button" href="/letter/u"><White><div class="letter">u</div></White></a>

    <a class="l button" href="/letter/l"><White><div class="letter">l</div></White></a>
    <a class="f button" href="/letter/f"><White><div class="letter">f</div></White></a>
    <a class="b button" href="/letter/b"><White><div class="letter">b</div></White></a>


    <div class="practice-the-sounds">
        <div class="english">
            <EnglishText key={"pract_sound"}></EnglishText>
        </div>
        <LearnerText key={"pract_sound"}></LearnerText>
    </div>

    <a class="sound-test" href="/practice/sound-group-3">
        <SoundQuiz/>
    </a>

    <div class="practice-the-names">
        <div class="english">
            <EnglishText key={"pract_name"}></EnglishText>
        </div>
        <LearnerText key={"pract_name"}></LearnerText>
    </div>

    <a class="name-test" href="/practice/name-group-3">
        <NameQuiz/>
    </a>
</div>

<style>
    .outer-grid { 
        display: grid;
        padding: 0px 15px;
        grid-template-columns: 1fr 1fr 1fr; 
        grid-template-rows: 50px 84px 27vw 27vw 84px 33vw 84px 33vw;
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

    .g {
        grid-row: 3 / 4;
        grid-column: 1 / 2;
    }
    .o {
        grid-row: 3 / 4;
        grid-column: 2 / 3;
    }
    .u {
        grid-row: 3 / 4;
        grid-column: 3 / 4;
    }

    .l {
        grid-row: 4 / 5;
        grid-column: 1 / 2;
        aspect-ratio: 1;
    }
    .f {
        grid-row: 4 / 5;
        grid-column: 2 / 3;
    }
    .b {
        grid-row: 4 / 5;
        grid-column: 3 / 4;
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
        width: auto; 
        aspect-ratio: 2;
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
        width: auto; 
        aspect-ratio: 2;
    }
    </style>