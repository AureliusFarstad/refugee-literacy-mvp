<script>
    import White from "$lib/buttons/styles/white_button.svelte";
    import WhiteCircular from "$lib/buttons/styles/white_button_circular.svelte";
    import EnglishText from "$lib/english_text.svelte";
    import LearnerText from "$lib/learner_text.svelte";
</script>

<body>
<div class="outer-grid">
    <a href="/" class="back-button">
        <White><div class="illustration"><img class="arrow" src="/images/icons/arrow_backward.svg" alt="arrow"></div></White>
    </a>
    <a href="/alphabet" class="abc"> 
        <WhiteCircular><img class="alphabet-blocks" src="/images/icons/alphabet_blocks.svg" alt="arrow"></WhiteCircular>
    </a>
    <div class="learn-alphabet">
        <div>
        <EnglishText key={"home.learn_the_alphabet"}></EnglishText>
        </div>
        <div>
        <LearnerText key={"home.learn_the_alphabet"}></LearnerText>
        </div>
    </div>
</div>
</body>

<style>
.outer-grid { 
    display: grid;
    place-items: center;
    padding-top: 10px;
    padding-left: 15px;
    padding-right: 8px;
    grid-template-columns: 35% 65%; 
    grid-template-rows: 50px auto;
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

.abc {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    width: 100%;
}

.alphabet-blocks {
    display: block;
    /* position: absolute;    */
    height: 90%;
    transform: translate(0%, 5%);
}

.learn-alphabet {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
}
</style>
