<script>
    import Card from "$lib/components/card.svelte"
    import Sound from "$lib/components/buttons/letter/sound.svelte"
    import White from "$lib/components/buttons/styles/white_button.svelte";
    import Name from "$lib/components/buttons/letter/name.svelte"
    import PersonSpeaking from "$lib/components/buttons/person_speaking.svelte"

    export let data
    $: letter = data.letter

    let back_url
    if (['s', 'a', 't', 'p', 'i', 'n'].indexOf(letter) > -1) {
        back_url = "/group/1"
    } else if (['c', 'k', 'e', 'h', 'r', 'm', 'd'].indexOf(letter) > -1) {
        back_url = "/group/2"
    } else if (['g', 'o', 'u', 'l', 'f', 'b'].indexOf(letter) > -1) {
        back_url = "/group/3"
    } else if (['j', 'q', 'z', 'w', 'v', 'y', 'x'].indexOf(letter) > -1) {
        back_url = "/group/4"
    } else {
        back_url = "/alphabet" 
    }
</script>

<div class="outer-grid"> 
    <a href={back_url} class="back-button">
        <White><div class="illustration"><img class="arrow" src="/images/icons/arrow_backward.svg" alt="arrow"></div></White>
    </a>
    <div class="letter-card"><Card {letter} /></div>

    <div class="sound-button"><Sound {letter} /></div>
    <div class="sound-explained"><PersonSpeaking key={"sound_expl"}></PersonSpeaking></div>
    <div class="name-button"><Name {letter} /></div>
    <div class="name-explained"><PersonSpeaking key={"name_expl"}></PersonSpeaking></div>
</div>
    
<style>
.outer-grid { 
    display: grid;
    grid-template-rows: 50px 3fr 1fr 1fr 1fr;
    grid-template-columns: auto 40px; 
    grid-row-gap: 24px;
    grid-column-gap: 10px;

    padding: 10px 12px 20px;
    width: 100%;
    height: 100%;
}

.back-button {
    grid-row: 1 / 2;
    grid-column: 1 / 2;

    width: 100px;
    height: 50px;
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

.letter-card {
    grid-row: 2 / 3;
    grid-column: 1 / 3;
}

.sound-button {
    grid-row: 3 / 4;
    grid-column: 1 / 2;
}

.sound-explained {
    grid-row: 3 / 4;
    grid-column: 2 / 3;
    align-items: center;
    justify-content: center;

    display: flex;
}

.name-button {
    grid-row: 4 / 5;
    grid-column: 1 / 2;
}

.name-explained {
    grid-row: 4 / 5;
    grid-column: 2 / 3;
    align-items: center;
    justify-content: center;

    display: flex;
}

</style>