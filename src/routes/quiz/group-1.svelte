<script context="module">
    export async function load({ page }) {
        let group_num = page.params.groupnum
        return { props: {group_num} }
    }
</script>

<script>
    import { t, locale, locales } from "$lib/stores/i18n";
    import SoundSpeaker from "$lib/buttons/sound_speaker.svelte"
    import SoundLetter from "$lib/buttons/sound_letter.svelte"

    // export let group_num

    const LETTERS = [
		"s", "a", "t", "p", "i", "n"
	];

    function shuffle(original) {
        console.log(original)
        var array = original;
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    let letter_queue = shuffle(LETTERS)

    function pickThreeLetters () {
        if(!letter_queue) {return}
        let correct = letter_queue.shift()
        let falses = []
        falses.push(letter_queue.shift())
        falses.push(letter_queue.shift())
        console.log(correct)
        return [correct, falses]
    }

    let [correct_letter, false_letters] = pickThreeLetters()
    console.log(correct_letter)
    console.log(false_letters)
    let pressed = ""

    function extendQueue () {
        let extension = shuffle(LETTERS)
        while (extension[0] = correct_letter) {extension = shuffle(LETTERS)}
        letter_queue.extend(extension)
    }

    function updateLetters() {
        [correct_letter, false_letters] = pickThreeLetters()
        if (letter_queue.length < 3) {
            extendQueue()
        }
    }

    function updatePressed(letter) {
        console.log("pressed "+letter)
        pressed = letter
    }

    console.log(false_letters.concat([correct_letter]))
</script>

<div class="outer-grid"> 
    <div class="speaker"><SoundSpeaker letter={correct_letter}/></div> 
    {#each shuffle(false_letters.concat([correct_letter])) as ltr, i}
        <div class="letter-{ltr}" on:click={updatePressed(ltr)}>
            <SoundLetter {pressed} letter={ltr} />
        </div>
    {/each}
</div>

<style>
.outer-grid { 
    position: relative;
    top: 80px;

    display: grid;
    padding: 0px 12px;
    grid-template-columns: 1fr 1fr 1fr; 
    grid-template-rows: 3fr 1fr 1fr 1fr;
    grid-gap: 24px;

    padding-bottom: 20px;

    width: 100vw;
    height: 100vh;
}
.speaker {
    grid-row: 1 / 2;
    grid-column: 1 / 4;
    aspect-ratio: 1;
}
</style>