<script>
    import SvgLetter from "./svg_letter.svelte";
    export let letter;
</script>

<div class="card">
    <div class="outerlines">
        <SvgLetter {letter}></SvgLetter>
        <div class="innerlines"></div>
    </div>
</div>

<style>
.svg {
    display: block;

    z-index: 2;
    height: 100%;
    width: auto;
    margin: 0 auto;
}

.card {
    height: 66vw;
    position: relative;

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
}

</style>