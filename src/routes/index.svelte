<script>
import { locale } from "$lib/data/stores/i18n";
import { fade } from 'svelte/transition';

$locale="";

import BigLanguageToggle from '$lib/components/language-toggle/big.svelte'
import EnglishText from '$lib/components/english_text.svelte';
import LearnerText from '$lib/components/learner_text.svelte';
import White from "$lib/components/buttons/styles/white_button.svelte";
</script>

<body>
    <div class="outer-grid">
        <div class="intro-language"> 
            <img class="finger" src="/images/icons/finger.svg" alt="press the button">
            <EnglishText key={"language"}></EnglishText>
        </div>
        <div class="pick-language-select">
            <BigLanguageToggle />
        </div>
    {#if $locale}
        <div in:fade="{{duration: 1200}}" class="welcome">
            <EnglishText key={"cont"}></EnglishText>
            <LearnerText key={"cont"}></LearnerText>
        </div>
        <a href="/browse" in:fade="{{duration: 1200}}" class="forward">
            <White><div class="illustration"><img class="arrow" src="/images/icons/arrow-forward.svg" alt="arrow"></div></White>
        </a>
    {/if}
    </div>
</body>

<style>
.outer-grid { 
    display: grid;
    place-items: center;
    padding: 0px 15px;
    grid-template-columns: 1fr 1fr 1fr; 
    grid-template-rows: 45px 70px auto 150px 70px;
    grid-gap: 16px;
    padding-bottom: 20px;
}

.intro-language {
    position: relative;
    grid-row: 2 / 3;
    grid-column: 1 / 4;
    width: auto;
    text-align: center;
}

@keyframes MoveUpDown {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.finger {
    animation: MoveUpDown 1.5s linear infinite;
    position: absolute;
    width: 50px;
    right: -3px;
    top: -32px;
}

.pick-language-select {
    grid-row: 3 / 4;
    grid-column: 1 / 4;
}

.welcome {
    /* display: inline-block; */
    /* width: auto; */
    grid-row: 4 / 5;
    grid-column: 1 / 4;
}

.forward {
    grid-row: 5 / 6;
    grid-column: 1 / 4;
    width: auto;
    height: 100%;
}

.illustration {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    aspect-ratio: 2;
}

.arrow {
    display: block;
    /* position: absolute;    */
    height: 100%;
    transform: translate(0%, 12%);
}
</style>