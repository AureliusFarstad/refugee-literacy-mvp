<script>
    export let active = false;

</script>

<div class="btn" class:active="{active}"><slot></slot></div>

<style>
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');

.btn {
    display: flex;
    align-items: center;

    position: relative;
    top: 0px;

    box-sizing: border-box;

    width: 100%;
    height: 100%;
    min-height: 70px;

    box-shadow: 0px 8px 0px 1px #c2b56f; /*  #D7EAC3; */

    background-color:  #fff09d; /* #7CB441; */
    border:4px solid #fff09d;
    border-radius: 6px;

    font-family: 'Patrick Hand', cursive;

    text-indent:0;
    /* border:1px solid #3B7A57; */
    display:inline-block;
    color:#000004;
    
    font-size:  30px;
    text-align: center;

    transition: all 0.6s ease-out;
}

.active {
    position: relative;
    top: 6px;
    box-shadow: 0px 2px 0px 0px #aca162;
    background-color:  #f5e797; /* #7CB441; */

    border:4px solid #ebdd91;
    transition: top 0.4s ease-out;
    transition: all 0.6s ease-out;
    /* transition: all 2s ease-in-out 0s 1 forward both; */
    /*  border 0.5s ease-in-out 1s 1 forward both; */
}
</style>