<script>
import White from "$lib/components/buttons/styles/white_button.svelte";
import Book from "$lib/components/book.svelte"
</script>

<body>
    <div class="outer-grid">
        <a href="/browse" class="back-button">
            <White><div class="illustration"><img class="arrow" src="/images/icons/arrow_backward.svg" alt="arrow"></div></White>
        </a>
        <a href="books/hadiya_at_the_market/1" class="hadiya-book">
            <Book title={"Hadiya at the market"} cover_image={"/books/hadiya_at_the_market/1.jpeg"} />
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

.hadiya-book {
    grid-row: 2 / 3;
    grid-column: 1 / 4;
}
</style>