<script>
import NameQuiz from "$lib/components/buttons/group/name_quiz.svelte";
import SoundQuiz from "$lib/components/buttons/group/sound_quiz.svelte";
import WhiteBtn from "$lib/components/buttons/styles/white_button.svelte";
import EnglishText from "$lib/components/english_text.svelte";
import LearnerText from "$lib/components/learner_text.svelte";
</script>

<div class="outer-grid">

<a href="/alphabet" class="back-button">
    <WhiteBtn><div class="illustration"><img class="arrow" src="/images/icons/arrow_backward.svg" alt="arrow"></div></WhiteBtn>
</a>
<div class="learn-the-letters">
    <div class="english">
        <EnglishText key={"letters"}/>
    </div>
    <LearnerText key={"letters"}/>
</div>

<!-- Group 4: j, q, v, w, x, y, z -->

<div class="row-1">
    <a class="j button" href="/letter/j"><WhiteBtn><div class="letter">j</div></WhiteBtn></a>
    <a class="q button" href="/letter/q"><WhiteBtn><div class="letter">q</div></WhiteBtn></a>
</div>

<a class="v button" href="/letter/v"><WhiteBtn><div class="letter">v</div></WhiteBtn></a>
<a class="w button" href="/letter/w"><WhiteBtn><div class="letter">w</div></WhiteBtn></a>
<a class="x button" href="/letter/x"><WhiteBtn><div class="letter">x</div></WhiteBtn></a>

<div class="row-2">
    <a class="y button" href="/letter/y"><WhiteBtn><div class="letter">y</div></WhiteBtn></a>
    <a class="z button" href="/letter/z"><WhiteBtn><div class="letter">z</div></WhiteBtn></a>
</div>

<div class="practice-the-sounds">
    <div class="english">
        <EnglishText key={"pract_sound"}/>
    </div>
    <LearnerText key={"pract_sound"}/>
</div>

<a class="sound-test" href="/practice/sound-group-4">
    <SoundQuiz/>
</a>


<div class="practice-the-names">
    <div class="english">
        <EnglishText key={"pract_name"}/>
    </div>
    <LearnerText key={"pract_name"}/>
</div>

<a class="name-test" href="/practice/name-group-2">
    <NameQuiz/>
</a>

</div>

<style>
.outer-grid {
    place-items: center;

    display: grid;
    grid-template-rows: 50px 84px 27vw 27vw 27vw 84px 33vw 84px 33vw;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 22px;

    padding: 10px 0 20px;
}

.back-button {
    grid-row: 1 / 2;
    grid-column: 1 / 2;

    width: 100%;
    height: 100%;
}

.illustration {
    align-items: center;
    justify-content: center;

    display: flex;

    height: 100%;
}

.arrow {
    position: absolute;   

    height: 110%;
}

.learn-the-letters {
    grid-row: 2 / 3;
    grid-column: 1 / 4;   

    width: auto;
}

.button {
    width: 27vw;
    height: 27vw;
}

.letter {
    font-size: 13vw;
}

.row-1 {
    grid-row: 3 / 4;
    grid-column: 1 / 4;

    display: inline-flex;
    flex-direction: row;
    justify-content: center;

    width: 100%;
    height: 100%;
}
.j {
    margin-right: 6px;
}
.q {
    margin-left: 6px;
}

.v {
    grid-row: 4 / 5;
    grid-column: 1 / 2;
}
.w {
    grid-row: 4 / 5;
    grid-column: 2 / 3;
}
.x {
    grid-row: 4 / 5;
    grid-column: 3 / 4;
}

.row-2 {
    grid-row: 5 / 6;
    grid-column: 1 / 4;

    display: inline-flex;
    flex-direction: row;
    justify-content: center;

    width: 100%;
    height: 100%;
}
.y {
    margin-right: 6px;
}
.z {
    margin-left: 6px;
}

.practice-the-sounds {
    grid-row: 6 / 7;
    grid-column: 1 / 4;    

    width: auto; 
}

.sound-test {
    grid-row: 7 / 8;
    grid-column: 1 / 4; 

    width: 80%; 
    height: 100%;
}

.practice-the-names {
    grid-row: 8 / 9;
    grid-column: 1 / 4; 

    width: auto; 
}

.english {
    margin-bottom: 8px;
}

.name-test {
    grid-row: 9 / 10;
    grid-column: 1 / 4;  

    width: 80%; 
    height: 100%;
}
</style>