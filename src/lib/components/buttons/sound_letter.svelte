<script>
    import YellowGuessingButton from "$lib/components/buttons/styles/yellow_guessing_button.svelte";

    export let guessed_letter;
    export let correct_letter;
    export let letter;

    let active_green;
    let active_red;
    let green;

    $: if (guessed_letter != "") {
        if (letter == guessed_letter && letter == correct_letter) {
            active_green = true;
        } else if (letter == guessed_letter && letter != correct_letter) {
            active_red = true;
        } else if (letter != guessed_letter && letter == correct_letter) {
            green = true;    
        }
    } else {
        active_green = false;
        active_red = false;
        green = false;
    }
</script>
<YellowGuessingButton {active_green} {active_red} {green}>
    <div class="center">
        {letter}
    </div>
</YellowGuessingButton>

<style>
.center {
    width: 100%;
    height: 100%;
    display: flex; 
    align-items: center; 
    justify-content: center;
}
</style>