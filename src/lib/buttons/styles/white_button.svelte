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

    box-shadow: 0px 8px 0px 0px rgb(146, 146, 160); /* #D7EAC3; */

    background: linear-gradient(180deg, rgb(236, 236, 252) 0%, rgb(222, 222, 230) 100%);

    /* background: linear-gradient(180deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%); */
; /* #7CB441; */
    border:4px solid #ffffff;
    border-radius: 6px;

    font-family: 'Patrick Hand', cursive;

    text-indent:0;
    /* border:1px solid #3B7A57; */
    display:inline-block;
    color:#000004;
    
    font-size:40px;
    text-align:center;

    transition: all 0.6s ease-out;
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