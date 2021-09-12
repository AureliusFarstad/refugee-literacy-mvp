<script context="module">
    export async function load({ page }) {
        let letter = page.params.letter
        return { props: {letter} }
    }
</script>

<script>
    import Card from "$lib/card.svelte"
    import Sound from "$lib/buttons/letter/sound.svelte"
    import Name from "$lib/buttons/letter/name.svelte"
    import Example from "$lib/buttons/letter/example.svelte"

    export let letter
</script>

<div class="outer-grid"> 
    <div class="letter-card"><Card {letter} /></div>
    <div class="name-button"><Sound {letter} /></div>
    <div class="sound-button"><Name {letter} /></div>
    <div class="example-button"><Example {letter} /></div>
</div>
    
    <style>
    .outer-grid { 
        display: grid;
        padding: 0px 12px;
        grid-template-columns: 1fr 1fr 1fr; 
        grid-template-rows: 3fr 1fr 1fr 1fr;
        grid-gap: 24px;

        padding-bottom: 20px;

        width: 100vw;
        height: 100vh;
    }
    .letter-card {
        grid-row: 2 / 3;
        grid-column: 1 / 4;
    }
    .name-button {
        grid-row: 3 / 4;
        grid-column: 1 / 4;
    }
    .sound-button {
        grid-row: 4 / 5;
        grid-column: 1 / 4;
    }
    .example-button {
        grid-row: 5 / 6;
        grid-column: 1 / 4;
    }
    </style>