<img class="finger" src="/images/icons/finger.svg" alt="press the button">

<style>
@keyframes MoveUpDown {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
}
  
.finger {
    position: absolute;
    top: -32px;
    right: -3px;

    animation: MoveUpDown 1.5s linear infinite;

    width: 50px;
}
</style>