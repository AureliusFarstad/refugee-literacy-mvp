<script>
    import SvgLetter from "./svg_letter.svelte";

    export let letter;

    let svgLetterEl
</script>

<div class="card">
    <div on:click={svgLetterEl.animate()} class="animate">
        <img class="illustration" src="/images/icons/writing_hand.svg" alt="write">
    </div>
    <div class="outerlines">
        <div class="svg">
            <SvgLetter {letter} bind:this={svgLetterEl}></SvgLetter>
        </div>
        <div class="innerlines"></div>
    </div>
</div>

<style>
.animate {
    width: 44px;
    height: 44px;
    border-radius: 22px;
    border-width: 2px;
    border-style: solid;
    border-color: blueviolet;
    background-color: white;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 3;
}

.svg {
    position: relative;
    height: 100%;
    z-index: 300;
}

.card {
    height: 66vw;
    position: relative;
    z-index: 1;

    display: flex;
    align-items: center;
    
    align-items: center;
    border-radius: 5px;
    background-color: #faf5f5;
    box-shadow: 1px 1px 9px 0px #295d90;
    text-align: center;
}

.outerlines {
    position: absolute;
    top: 20%;
    width: 100%;
    height: 60%;
    padding-right: 0px;
    padding-bottom: 0px;
    border-style: dashed solid;
    border-width: 3px 0px;
    border-color: #9173ff #000 #9173ff;
    border-radius: 0px;
    background-color: transparent;
    cursor: auto;
    z-index: 2;

}

.innerlines {
    position: absolute;
    top: 33%;
    bottom: 33%;
    width: 100%;
    height: 34%;
    padding-right: 0px;
    padding-bottom: 0px;
    border-top: 2.5px solid #9173ff;
    border-bottom: 2.5px solid #9173ff;

    z-index: 2;
}

.illustration{
    /* display: block; */
    /* position: absolute; */
    height: 110%;
    width: auto;
    transform: translate(8%, 5%);
}

</style>