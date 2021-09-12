<script>
    import { t, locale, locales } from "$lib/stores/i18n";

    import White from '$lib/buttons/styles/white_button.svelte'
    import SvgLetter from "$lib/svg_letter.svelte";
    import ListenAndPick from '$lib/buttons/listen_and_pick.svelte'

import { group_outros } from "svelte/internal";
</script>

<div class="outer-grid">
    <p class="text-1">{$t("group.learn_the_letters")}</p>

    <a class="s" href="/letter/s"><White><SvgLetter letter="s"></SvgLetter>
    </White></a>
    <a class="a" href="/letter/a"><White>a</White></a>
    <a class="t" href="/letter/t"><White>t</White></a>

    <a class="p" href="/letter/p"><White>p</White></a>
    <a class="i" href="/letter/i"><White>i</White></a>
    <a class="n" href="/letter/n"><White>n</White></a>

    <p class="text-2">{$t("group.practice_their_sounds")}</p>
    <a class="quiz-test" href="/quiz/group-1"><ListenAndPick></ListenAndPick></a>
</div>

<style>
    .outer-grid { 
        display: grid;
        padding: 0px 15px;
        grid-template-columns: 1fr 1fr 1fr; 
        grid-template-rows: 70px auto auto auto auto auto;
        grid-gap: 24px;
    }

    p {
        font-family: 'Patrick Hand', cursive;
        font-size: 32px;
        margin: 0px;
        margin-bottom: -14px;
    }
    
    .text-1 {
        grid-row: 2 / 3;
        grid-column: 1 / 4;      
    }

    .s {
        grid-row: 3 / 4;
        grid-column: 1 / 2;
        aspect-ratio: 1;
    }
    .a {
        grid-row: 3 / 4;
        grid-column: 2 / 3;
    }
    .t {
        grid-row: 3 / 4;
        grid-column: 3 / 4;
    }

    .p {
        grid-row: 4 / 5;
        grid-column: 1 / 2;
        aspect-ratio: 1;
    }
    .i {
        grid-row: 4 / 5;
        grid-column: 2 / 3;
    }
    .n {
        grid-row: 4 / 5;
        grid-column: 3 / 4;
    }

    .text-2 {
        grid-row: 5 / 6;
        grid-column: 1 / 4;      
    }

    .quiz-test {
        grid-row: 6 / 7;
        grid-column: 1 / 4;   
        aspect-ratio: 3.3;
    }
    </style>