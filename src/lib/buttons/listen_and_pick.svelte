<script>
	import White from './styles/white_button.svelte';

    export let letter;
</script>
<White>
    <div class="grid">
        <div class="illustration-1">
            <img class="illustration" src="/images/whisper.svg" alt="whisper">
        </div>
        <div class="illustration-2">
            <img class="illustration" src="/images/listen.svg" alt="listen">
        </div>
        <div class="illustration-3">
            <img class="illustration" src="/images/pick.svg" alt="pick">
        </div>
    </div>
</White>

<style>
.grid > div {
    height: 100%;
    width: 100%;
    text-align: center;
}
.illustration {
    display: block;
    position: absolute;
    height: 100%;
    width: auto;
    transform: translate(16%, 9%);
}
/* .illustration {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 100%;
    width: auto;
    transform: translate(-50%, -50%);
} */
.grid {
    height: 100%;
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr 1fr; 
}
</style>