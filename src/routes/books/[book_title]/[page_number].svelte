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
    display: grid;
    place-items: center;
    height: calc(100vh - 15px);
    padding: 0px 15px;
    padding-top: 10px;
    padding-bottom: 5px;
    grid-template-columns: 1fr 1fr 1fr; 
    grid-template-rows: 50px auto 40px 50px;
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
.book {
    transform: translate(0%, 9%);
    height: 150%;
}

.page {
    grid-row: 2 / 3;
    grid-column: 1 / 4;

    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 6px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.image-container {
    /* max-width: 100%;  */
    max-height: 50vh;
    overflow: hidden;
}
.image {
    width: 100%;
    height: auto;
}
.text {
    color: #000004;
    font-size: 32px;
    font-family: 'Patrick Hand';
    text-align: center;
    line-height: 36px;
    white-space: pre-wrap;
    margin-left: 2px;
    margin-right: 2px;
    margin-bottom: 4px;
}

.sound-button {
    grid-row: 3 / 5;
    grid-column: 2 / 3;

    position: relative;
    top: -12px;

    width: 100%;
    padding: 8px;
}

.last-page {
    grid-row: 4 / 5;
    grid-column: 1 / 2;
    height: 100%;
    width: 80%;
}
.next-page {
    grid-row: 4 / 5;
    grid-column: 3 / 4;
    height: 100%;
    width: 80%;
    float: right;
}
.arrow {
    position: absolute;   
    height: 110%;
}
.arrow-forward {
    position: absolute;   
    height: 110%;
    transform: translate(0%, 12%);
}

/* .text {
    grid-row: 3 / 4;
    grid-column: 1 / 4;
} */
</style>

