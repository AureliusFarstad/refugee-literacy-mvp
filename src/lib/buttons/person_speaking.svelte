<script>
    let active;
</script>

<div class="btn" class:active="{active}">            
    <img class="illustration" src="/images/icons/person_countour_sparks_mouth.svg" alt="listen">
</div>

<style>
.btn {
    display: flex;
    align-items: center;

    position: relative;
    top: 0px;

    box-sizing: border-box;

    width: 40px;
    height: 40px;

    box-shadow: 0px 4px 0px 0px #238031; /* #D7EAC3; */

    background-color: #EDFDEE;

    border-style: solid;
    border-width: 1.7px;
    border-color: #032436;
    border-radius: 20px;

    /* font-family: 'Patrick Hand', cursive; */

    /* border:1px solid #3B7A57; */

    transition: all 0.6s ease-out;
}
.illustration {
    width: 80%;
    height: auto;
    transform: translate(4px, 3px)
}

.active {
    position: relative;
    top: 6px;
    box-shadow: 0px 2px 0px 0px #60a83d;
    border:4px solid #fffd72;
    transition: all 0.6s ease-out;
    /* transition: all 2s ease-in-out 0s 1 forward both; */
    /*  border 0.5s ease-in-out 1s 1 forward both; */
}
</style>