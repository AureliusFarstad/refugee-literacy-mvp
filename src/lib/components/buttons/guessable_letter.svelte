<script>
    export let letter;
    export let guessed_option;
    export let correct_option;

    let active_green;
    let active_red;
    let green;

    $: if (guessed_option != "") {
        if (letter == guessed_option && letter == correct_option) {
            active_green = true;
        } else if (letter == guessed_option && letter != correct_option) {
            active_red = true;
        } else if (letter != guessed_option && letter == correct_option) {
            green = true;    
        }
    } else {
        active_green = false;
        active_red = false;
        green = false;
    }
</script>

<div class="container" class:green="{green}" class:active-red="{active_red}" class:active-green="{active_green}">
{letter}
</div>


<style>
.container {
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

    font-family: 'Patrick Hand';

    text-indent: 0;
    color:#000004;
    
    font-size:  45px;

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