<script>
    export let active_green = false;
    export let active_red = false;
    export let green = false;
</script>

<div class="btn" class:green="{green}" class:active-red="{active_red}" class:active-green="{active_green}"><slot></slot></div>

<style>
.btn {
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    top: 0px;

    box-sizing: border-box;

    width: 100%;
    height: 100%;

    box-shadow: 0px 8px 0px 1px #c2b56f;

    background-color:  #fff09d;
    border:4px solid #fff09d;
    border-radius: 6px;

    font-family: 'Patrick Hand', cursive;

    text-indent:0;
    display:inline-block;
    color:#000004;
    
    font-size:  30px;


    /* transition: top 0.4s ease-out; */
    transition: all 0.6s ease-out;

}

@keyframes show-correct {
    from {
        top: 0px;
        background-color:  #fff09d; /* #7CB441; */
        box-shadow: 0px 8px 0px 1px #c2b56f;
        border:4px solid #fff09d;
    }
    50% {
        top: 0px;
        background-color:  #fff09d; /* #7CB441; */
        box-shadow: 0px 8px 0px 1px #c2b56f;
        border:4px solid #fff09d;
    }
    100% {
        top: 0px;
        box-shadow: 0px 8px 0px 1px #c2b56f;
        background-color:  rgb(50, 223, 102);
        border:4px solid #fff09d;
    }
}

.green {
    animation-name: show-correct;
    animation-duration: 1.5s;
    box-shadow: 0px 8px 0px 1px #c2b56f; /*  #D7EAC3; */
    background-color:  rgb(50, 223, 102);
}

@keyframes correct-press {
    from {
        top: 0px;
        background-color:  #fff09d; /* #7CB441; */
        box-shadow: 0px 8px 0px 1px #c2b56f; /*  #D7EAC3; */
        border:4px solid #fff09d;
    }
    30% {
        top: 6px;
        box-shadow: 0px 2px 0px 0px #aca162;
        background-color:  #f5e797; /* #7CB441; */
        border:4px solid #ebdd91;
    }
    50% {
        top: 6px;
        box-shadow: 0px 2px 0px 0px #aca162;
        background-color:  #f5e797; /* #7CB441; */
        border:4px solid #ebdd91;
    }
    100% {
        top: 6px;
        box-shadow: 0px 2px 0px 0px #aca162;
        background-color:  rgb(50, 223, 102);
        border: 4px solid #ebdd91;
    }
}

.active-green {
    animation-name: correct-press;
    animation-duration: 1.5s;

    top: 6px;
    box-shadow: 0px 2px 0px 0px #aca162;
    background-color:  rgb(50, 223, 102);
    border:4px solid #ebdd91;
}

@keyframes false-press {
    from {
        top: 0px;
        background-color:  #fff09d; /* #7CB441; */
        box-shadow: 0px 8px 0px 1px #c2b56f; /*  #D7EAC3; */
        border:4px solid #fff09d;
    }
    30% {
        top: 6px;
        box-shadow: 0px 2px 0px 0px #aca162;
        background-color:  #f5e797; /* #7CB441; */
        border:4px solid #ebdd91;
    }
    50% {
        top: 6px;
        box-shadow: 0px 2px 0px 0px #aca162;
        background-color:  #f5e797; /* #7CB441; */
        border:4px solid #ebdd91;
    }
    100% {
        top: 6px;
        box-shadow: 0px 2px 0px 0px #aca162;
        background-color:  red;
        border: 4px solid #ebdd91;
    }
}

.active-red {
    animation-name: false-press;
    animation-duration: 1.5s;

    top: 6px;
    box-shadow: 0px 2px 0px 0px #aca162;
    background-color:  red; /* #7CB441; */
    border:4px solid #ebdd91;
}
</style>