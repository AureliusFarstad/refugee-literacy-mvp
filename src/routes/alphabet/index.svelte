<script>
import White from '$lib/buttons/styles/white_button.svelte'
import BigLanguageToggle from '$lib/language-toggle/big.svelte'
import EnglishText from '$lib/english_text.svelte';
import LearnerText from '$lib/learner_text.svelte';
</script>

<body>
    <div class="outer-grid">
        <a href="/browse" class="back-button">
            <White><div class="illustration"><img class="arrow" src="/images/icons/arrow_backward.svg" alt="arrow"></div></White>
        </a>
        <div class="introduction">
            Introduction to letter names, sounds, groupings placeholder
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
    padding-top: 10px;
    grid-template-columns: 1fr 1fr 1fr; 
    grid-template-rows: 50px 100px 70px 70px 70px auto;
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

.introduction {
    width: auto;
    grid-row: 2 / 3;
    grid-column: 1 / 4;
}

.group-1 {
    width: 100%;
    grid-row: 3 / 4;
    grid-column: 1 / 4;
}
.group-2 {
    width: 100%;
    grid-row: 4 / 5;
    grid-column: 1 / 4;
}
.group-3 {
    width: 100%;
    grid-row: 5 / 6;
    grid-column: 1 / 4;
}
</style>