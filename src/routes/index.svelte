<script>
import White from '$lib/buttons/styles/white_button.svelte'
import BigLanguageToggle from '$lib/language-toggle/big.svelte'
import EnglishText from '$lib/english_text.svelte';
import LearnerText from '$lib/learner_text.svelte';
</script>

<body>
    <div class="outer-grid">
        <div class="speech-bubble-world-div"> 
            <img class="speech-bubble-world-svg" src="/images/icons/world_inside_speech_bubble.svg" alt="pick language">
        </div>
        <div class="pick-language-select">
            <BigLanguageToggle />
        </div>
        <div class="learn-alphabet">
            <div>
            <EnglishText key={"home.learn_the_alphabet"}></EnglishText>
            </div>
            <div>
            <LearnerText key={"home.learn_the_alphabet"}></LearnerText>
            </div>
        </div>
        <div class="learn-alphabet-learner">
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
    grid-template-columns: 1fr 1fr 1fr; 
    grid-template-rows: 70px auto auto 70px 70px 70px auto;
    grid-gap: 22px;
}

.speech-bubble-world-div {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    height: 100%;
    width: 100%;
    text-align: center;
}
.speech-bubble-world-svg {
    display: block;
    height: 80px;
    width: auto;
    transform: translate(50%, 10px);
}

.pick-language-select {
    grid-row: 2 / 3;
    grid-column: 1 / 4;
}

.learn-alphabet {
    width: auto;
    grid-row: 3 / 4;
    grid-column: 1 / 4;
}

.group-1 {
    width: 90%;
    grid-row: 4 / 5;
    grid-column: 1 / 4;
}
.group-2 {
    width: 90%;
    grid-row: 5 / 6;
    grid-column: 1 / 4;
}
.group-3 {
    width: 90%;
    grid-row: 6 / 7;
    grid-column: 1 / 4;
}
</style>