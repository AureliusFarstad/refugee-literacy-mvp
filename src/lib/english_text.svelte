<script>
    import PersonSpeaking from "$lib/buttons/person_speaking.svelte";
    
    import { en } from "./stores/i18n";

    export let sound = true;
    export let key = "";
    console.log(key)
    console.log(en(key))
</script>

{#if sound}
<div class="left-to-right">
    <div class="text">{en(key)}</div>
    <div class="spacer"></div>
    <div class="sound-button"><PersonSpeaking></PersonSpeaking></div>
</div>
{/if}
<style>

.left-to-right {
    display: inline-flex;
    padding: 2px 0px;
}
.text {
    color: #000004;
    font-size: 32px;
    font-family: 'Patrick Hand', cursive;
    text-align: center;
    line-height: 36px;
    white-space: pre-wrap;
}
.spacer {
    display: inline-flex;
    width: 5px;
}
.sound-button {
    display: flex;
    align-items: center;
}

</style>