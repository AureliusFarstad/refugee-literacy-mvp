<script>
export let title;
export let cover_image;
</script>

<div class="book">
  <img class="cover-image" src={cover_image} alt="Cover" />
  <p class="title">
    {title}
  </p>
  <div class="pages">
  </div>
</div>
<style>
*{
    margin:0;
    padding:0;
    /* position: absolute; */
  }
  *, *:before, *:after { 
    box-sizing: inherit; 
  }
  .book{
    position: relative;
    width:300px;
    height:420px;
    background: #f3f031;
    border-radius: 20px 16px 12px 18px;
    background-image: linear-gradient(to right,#cac71d 32px, #b9b608 34px, transparent 34px);  
  }
  .cover-image {
    position: absolute;
    width: 80%;
    left: 45px;
    top: 80px;
  }
  .title {
    position: absolute;
    width: 80%;
    left: 45px;
    bottom: 80px;
    font-size: 30px;
    font-family: 'Patrick Hand';
  }
  .pages{
    position: absolute;
    height: 35px;
    width: 294px; 
    bottom: 6px;
    right: 0px;
    background: white;
    border-radius: 24px 4px 4px 24px;
    box-shadow: inset 4px 6px 0px 0px #E4E0CE;  
    background-image: linear-gradient(to bottom, transparent 6px, #E4E0CE 8px, transparent 8px, transparent 12px, #E4E0CE 12px, transparent 14px, transparent 18px,#E4E0CE 18px, transparent 20px, transparent 24px, #E4E0CE 24px, transparent 26px, transparent 30px, #E4E0CE 30px, transparent 32px, transparent 36px, #E4E0CE 36px, transparent 38px, transparent 42px, #E4E0CE 42px, transparent 44px, transparent 48px, #E4E0CE 48px, transparent 50px);     
  }
  .book:before{
    height: 20px;
    width: 160px; 
    right: 40px;
    top: 72px; 
    background:#D11F2F;
    border-radius: 20px;
    box-shadow: 0px 36px #D11F2F;
  }
</style>
  