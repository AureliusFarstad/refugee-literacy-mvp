<script>
import White from "$lib/components/buttons/styles/white_button.svelte";
import WhiteCircular from "$lib/components/buttons/styles/white_button_circular.svelte";
import EnglishText from "$lib/components/english_text.svelte";
import LearnerText from "$lib/components/learner_text.svelte";
</script>

<body>
<div class="outer-grid">
    <a href="/" class="back-button">
        <White><div class="illustration"><img class="arrow" src="/images/icons/arrow_backward.svg" alt="arrow"></div></White>
    </a>
    <a href="/alphabet" class="circular-btn abc"> 
        <WhiteCircular><img class="alphabet-blocks" src="/images/icons/alphabet_blocks.svg" alt="arrow"></WhiteCircular>
    </a>
    <div class="learn-alphabet">
        <div>
        <EnglishText key={"alphabet"}></EnglishText>
        </div>
        <div>
        <LearnerText key={"alphabet"}></LearnerText>
        </div>
    </div>
    <a href="/books" class="circular-btn books"> 
        <WhiteCircular><img class="book-icon" src="/images/icons/book.svg" alt="arrow"></WhiteCircular>
    </a>
    <div class="read-books">
        <div>
        <EnglishText key={"book"}></EnglishText>
        </div>
        <div>
        <LearnerText key={"book"}></LearnerText>
        </div>
    </div>
</div>
</body>

<style>
.outer-grid { 
    display: grid;
    grid-template-rows: 50px auto auto;
    grid-template-columns: 120px auto; 
    row-gap: 22px;
    place-items: center;

    padding: 10px 8px 0 15px;
}

.back-button {
    grid-row: 1 / 2;
    grid-column: 1 / 2;

    width: 100%;
    height: 100%;
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

.circular-btn {
    width: 120px;
    height: 120px;
}

.abc {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
}

.books {
    grid-row: 3 / 4;
    grid-column: 1 / 2;
}

.alphabet-blocks {
    display: block;

    transform: translate(0%, 5%);

    height: 90%;
}

.book-icon {
    display: block;

    transform: translate(0%, 10%);

    height: 100%;
}

.learn-alphabet {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
}

.read-books {
    grid-row: 3 / 4;
    grid-column: 2 / 3;
}

@media only screen and (max-width: 320px) {
    .outer-grid { 
        grid-template-columns: 100px auto; 

        padding-left: 8px;
    }

    .circular-btn {
        width: 100px;
        height: 100px;
    }
}
</style>
