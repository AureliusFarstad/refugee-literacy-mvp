<script>
export let active = false;
</script>

<div class="btn" class:active="{active}"><slot></slot></div>

<style>
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');

.btn {
    position: relative;
    top: 0px;
    align-items: center;
    justify-content: center;

    display: flex !important;

    box-shadow: 0px 8px 0px 0px rgb(146, 146, 160);
    border: 4px solid #ffffff;
    border-radius: 6px;
    width: 100%;
    height: 100%;

    background: linear-gradient(180deg, rgb(236, 236, 252) 0%, rgb(222, 222, 230) 100%);

    font-size: 40px;
    font-family: 'Patrick Hand';
    text-align:center;
    color:#000004;
}

.active {
    position: relative;
    top: 6px;

    transition: all 0.6s ease-out;

    box-shadow: 0px 2px 0px 0px #60a83d;
    border:4px solid #fffd72;
}
</style>