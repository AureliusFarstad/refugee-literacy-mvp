<script>
    import PersonSpeaking from "$lib/components/buttons/person_speaking.svelte";
    
    import { en } from "$lib/data/stores/i18n";

    export let sound = true;
    export let key = "";
</script>

<div class="left-to-right">
    <div class="text">{en(key)}</div>
    {#if sound}
    <div class="spacer"></div>
    <div class="sound-button"><PersonSpeaking {key} eng={true}></PersonSpeaking></div>
    {/if}
</div>
<style>

.left-to-right {
    display: inline-flex;
    padding: 2px 0px;
    margin-right: 0px;
}
.text {
    color: #000004;
    font-size: 32px;
    font-family: 'Patrick Hand';
    text-align: center;
    line-height: 36px;
    white-space: pre-wrap;
}
.spacer {
    display: inline-flex;
    width: 10px;
}
.sound-button {
    display: flex;
    align-items: center;
}

</style>