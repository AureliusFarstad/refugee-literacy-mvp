<script>
    export let active = false;

</script>

<div class="btn" class:active="{active}"><slot></slot></div>

<style>

.btn {
    display: flex;
    align-items: center;

    position: relative;
    top: 0px;

    box-sizing: border-box;

    width: 100%;
    height: 100%;

    box-shadow: 0px 8px 0px 1px #60a83d; /* #D7EAC3; */

    background-color:  #9ae04e; /* #7CB441; */
    border:4px solid #9ae04e;
    border-radius: 6px;

    font-family: 'Patrick Hand';

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