<script context="module">
    export async function load({ params }) {
        let book_title = params.book_title
        let page_number = params.page_number
        return { props: {
            book_title: book_title,
            page_number: page_number
        }}
    }
</script>

<script>
    import books from "$lib/data/books.json"
    import PersonSpeakingBook from "$lib/components/buttons/person_speaking_book.svelte";
    import White from '$lib/components/buttons/styles/white_button.svelte'

    export let book_title
    export let page_number
    $: next_page = parseInt(page_number) + 1
    $: last_page = parseInt(page_number) - 1

    $: image_source = ['/books/', book_title, '/', page_number, '.jpeg'].join('')
    $: text = books[ book_title ][ page_number-1 ]

    $: no_next_page = next_page > books[book_title].length
</script>

<div class="outer-grid">
    <a href="/books" class="back-button">
        <White>
            <div class="illustration"><img class="book" src="/images/icons/book.svg" alt="book"></div>
        </White>
    </a>

    <div class="page">
        {#if !no_next_page}
        <div class="image-container">
            <img class="image" src="{image_source}" alt="book">
        </div>
        {/if}
        <div class="text">{text}</div>
    </div>

    <div class="sound-button"><PersonSpeakingBook {book_title} {page_number}></PersonSpeakingBook></div>

    {#if page_number != 1} 
        <a href="/books/{book_title}/{last_page}" class="last-page">
            <White><div class="illustration"><img class="arrow" src="/images/icons/arrow_backward.svg" alt="arrow"></div></White>
        </a>
    {/if}

    {#if !no_next_page}
        <a href="/books/{book_title}/{next_page}" class="next-page">
            <White><div class="illustration"><img class="arrow-forward" src="/images/icons/arrow-forward.svg" alt="arrow"></div></White>
        </a>
    {/if}
</div>

<style>
.outer-grid { 
    place-items: center;

    display: grid;
    grid-template-rows: 50px auto 40px 50px;
    grid-template-columns: 1fr 1fr 1fr; 
    row-gap: 22px;

    height: calc(100vh - 15px);
    padding: 10px 15px 5px;
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

.book {
    transform: translate(0%, 9%);

    height: 150%;
}

.page {
    grid-row: 2 / 3;
    grid-column: 1 / 4;
    flex-direction: column;
    justify-content: space-around;

    display: flex;

    border-radius: 6px;
    width: 100%;
    height: 100%;

    background-color: white;
}

.image-container {
    overflow: hidden;

    max-height: 45vh;
}

.image {
    width: 100%;
    height: auto;
}

.text {
    margin: 0 8px 8px;

    font-size: 32px;
    line-height: 36px;
    font-family: 'Patrick Hand';
    text-align: center;
    white-space: pre-wrap;
    color: #000004;
}

.sound-button {
    grid-row: 3 / 5;
    grid-column: 2 / 3;
    position: relative;
    top: -12px;

    padding: 8px;
    width: 100px;
    height: 100px;
}

.last-page {
    grid-row: 4 / 5;
    grid-column: 1 / 2;

    width: 80%;
    height: 100%;
}

.next-page {
    grid-row: 4 / 5;
    grid-column: 3 / 4;
    float: right;

    width: 80%;
    height: 100%;
}

.arrow {
    position: absolute;

    height: 110%;
}

.arrow-forward {
    position: absolute;   

    transform: translate(0%, 12%);

    height: 110%;
}
</style>