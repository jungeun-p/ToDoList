const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber){
    const image = new Image();
    image.src =`images/${imgNumber+1}.jpg`; //1을 넣은 이유는 랜덤 함수가 0이기 때문
    image.classList.add("bgImage");
    body.prepend(image);

}

function genRandom(){
    const number= Math.floor(Math.random()*IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber= genRandom();
    paintImage(randomNumber)
}

init();