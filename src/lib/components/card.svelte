<script>
    import SvgLetter from "$lib/components/svg_letter.svelte";

    export let letter;

    let svgUppercaseEl
    let svgLowercaseEl
</script>

<div class="card">
    <div on:click={svgUppercaseEl.animate()} class="lower_case_animate animate">
        <img class="illustration" src="/images/icons/writing_hand.svg" alt="write">
    </div>
    <div on:click={svgLowercaseEl.animate()} class="upper_case_animate animate">
        <img class="illustration" src="/images/icons/writing_hand.svg" alt="write">
    </div>
    <div class="outerlines">
        <div class="textbox">
            <div class="uppercase">
                <SvgLetter {letter} uppercase={true} bind:this={svgUppercaseEl}></SvgLetter>
            </div>
            <div class="lowercase">
                <SvgLetter {letter} bind:this={svgLowercaseEl}></SvgLetter>
            </div>
        </div>
        <div class="innerlines"></div>
    </div>
</div>

<style>

.animate {
    width: 68px;
    height: 68px;
    border-radius: 22px;
    border-width: 2px;
    border-style: solid;
    border-color: blueviolet;
    background-color: white;
    position: absolute;
    bottom: 10px;
    z-index: 3;
}
@media only screen and (max-width: 360px) {
    .animate {
        width: 56px;
        height: 56px;
    }
}
.lower_case_animate {
    left: 10px;
}
.upper_case_animate {
    right: 10px;
}

.textbox {
    /* FOR after SVG fix: 
    position: relative;
    height: calc(100% + 6px);
    bottom: 3px; */

    display: flex;
    height: 100%;
    width: 100%;
    
    flex-direction: row;
    justify-content: space-around;
}

.uppercase {
    /* To compensate for border width. box-size: border-box not working. */
    /* height: calc(100% + 6px);  */
    /* bottom: 3px; */
    bottom: 2px;
    height: 100%;
    z-index: 300;
    position: relative;
    left: 14px;
}

.lowercase {
    /* height: calc(100% + 6px);
    bottom: 3px; */
    height: 100%;
    z-index: 300;
    position: relative;
    right: 14px;
}

.card {
    height: 66vw;
    position: relative;
    z-index: 1;

    display: flex;
    align-items: center;
    text-align: center;

    border-radius: 5px;
    background-color: #faf5f5;
    box-shadow: 1px 1px 9px 0px #295d90;
}

.outerlines {
    box-sizing: border-box;

    position: absolute;
    top: 20%;
    width: 100%;
    height: 39.6vw;

    padding-right: 0px;
    padding-bottom: 0px;
    border-style: dashed solid;
    border-width: 3px 0px;
    border-color: #9173ff #000 #9173ff;
    border-radius: 0px;
    background-color: transparent;
    z-index: 2;
}

.innerlines {
    box-sizing: border-box;

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