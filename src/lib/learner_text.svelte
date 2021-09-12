<script>
    import PersonSpeaking from "$lib/buttons/person_speaking.svelte";
    
    import { t } from "./stores/i18n";

    export let sound = true;
    export let key = "";
</script>

{#if sound}
<div class="right-to-left">
    <div class="text">{$t(key)}</div>
    <div class="spacer"></div>
    <PersonSpeaking></PersonSpeaking>
</div>
{/if}
<style>
.right-to-left {
    margin: 2px 0px;
    display:flex;
}

.text {
    color: #000004;
    font-size: 32px;
    font-family: 'Patrick Hand', cursive;
    text-align: center;
    line-height: 40px;

    margin-left: auto;
}
.spacer {
    width: 15px;
}
.sound-button {
    width: 40px;
    margin-left: auto;
}

</style>