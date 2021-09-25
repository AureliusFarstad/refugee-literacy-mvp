<script>
	import White from '../styles/white_button.svelte';
</script>
<White>
    <div class="grid">
        <div class="illustration-1">
            <img class="nametag" src="/images/icons/name-tag.svg" alt="name">
        </div>
        <div class="illustration-2">
            <img class="pick" src="/images/icons/man-picking-from-cards.svg" alt="pick">
        </div>
    </div>
</White>

<style>
.grid > div {
    height: 100%;
    width: 100%;
    text-align: center;
}
.nametag {
    display: block;
    position: absolute;   
    height: 85%;
    width: auto;
    transform: translate(16%, 9%);
}
.pick {
    display: block;
    position: absolute;
    height: 95%;
    width: auto;
    transform: translate(14%, 11%);
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
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr; 
}
</style>