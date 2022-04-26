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

    box-shadow: 0px 8px 0px 0px rgb(16, 100, 20); /* #D7EAC3; */

    background: linear-gradient(180deg, rgb(42, 190, 86) 0%, rgb(50, 223, 102));

    border:4px solid #ffffff;
    border-radius: 50%;

    text-indent:0;
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
}
</style>