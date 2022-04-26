<script>
    import PersonSpeaking from "$lib/components/buttons/person_speaking.svelte";
    
    import { t } from "$lib/data/stores/i18n";

    export let sound = true;
    export let key = "";
</script>

<div class="right-to-left">
    <div dir="rtl" class="text">{$t(key)}</div>
    {#if sound}
    <div class="spacer"></div>
    <div class="sound-button"><PersonSpeaking {key}></PersonSpeaking></div>
    {/if}
</div>
<style>
.right-to-left {
    margin: 2px 0px;
    display:flex;
}

.text {
    color: #000004;
    font-size: 32px;
    font-family: 'Patrick Hand';
    text-align: right;
    line-height: 40px;
    white-space: pre-wrap;
    margin-left: auto;
}
.spacer {
    display: inline-flex;
    width: 10px;
}
.sound-button {
    width: 40px;
    /* margin-left: auto; */
    display: flex;
    align-items: center;
}

</style>