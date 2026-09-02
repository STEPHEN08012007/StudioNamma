let mario =  document.querySelector(".mario");
let bucket = document.querySelector(".bucket");
let container = document.querySelector(".container");
let score = document.querySelector("#points");
let isMovingLeft =false;
let isMovingRight = false;
let isJumping = false;
let container_width = container.offsetWidth;
let mario_width = mario.offsetWidth;
let marioPosition =0;
let fallInterval ;
function jump(){
    if(isJumping) return;
    isJumping=true;
    let startPos = 90;
    let endPos =400;
    let velocity  = 5;
    let jumpInterval ;

    jumpInterval = setInterval(()=>{
             if(startPos<=endPos){
            startPos+=velocity;
            mario.style.bottom = startPos+"px";}
            else {
                clearInterval(jumpInterval);
                fall(startPos,velocity);
            }
        },10)

}
function fall(startPos,velocity){
    fallInterval = setInterval(()=>{
        if(startPos>90){
            startPos-=velocity;
            mario.style.bottom = startPos+"px";
        }
        else{
            clearInterval(fallInterval);
            console.log("cleared");
            mario.style.bottom = "90px"
            isJumping = false;

        }
    },10)
}
function moveMario() {
    let moment =5;

    if (isMovingLeft) {
        marioPosition -= moment;
        mario.style.transform ="scaleX(-1)"
    }

    if (isMovingRight) {
        marioPosition += moment;
        mario.style.transform ="scaleX(1)"
    }
    if (marioPosition < 0) {
        marioPosition = 0;
    }

    
    if (marioPosition > container_width-mario_width) {
        marioPosition = container_width-mario_width;
    }

    mario.style.left = marioPosition + "px";

    requestAnimationFrame(moveMario);
}

moveMario();
// move pipe
let pipeSpeed = 5;

function moveObstacle() {

    let pipe = document.createElement("img");

    pipe.src = "bucket_mario.png";   // your pipe image
    pipe.classList.add("pipe");

    // Start from right side of screen
    let pipePosition = container_width;

    pipe.style.left = pipePosition + "px";

    // Pipe stands on the wall
    pipe.style.bottom = "70px";

    container.appendChild(pipe);

    let scored = false;

    let pipeInterval = setInterval(() => {

        // Move pipe to left
        pipePosition -= pipeSpeed;

        pipe.style.left = pipePosition + "px";


        

        let marioRect = mario.getBoundingClientRect();
        let pipeRect = pipe.getBoundingClientRect();

        if (
            marioRect.right > pipeRect.left &&
            marioRect.left < pipeRect.right &&
            marioRect.bottom > pipeRect.top &&
            marioRect.top < pipeRect.bottom
        ) {
            clearInterval(pipeInterval);
            alert("Restart");
            resetGame();
        }



        if (
            !scored &&
            pipeRect.right < marioRect.left
        ) {
            scored = true;

            score.textContent =
                Number(score.textContent) + 1;
        }


        if (pipePosition + pipe.offsetWidth < 0) {

            clearInterval(pipeInterval);

            pipe.remove();
        }

    }, 10);
}
setInterval(() => {
    moveObstacle();
}, 2000);
function resetGame() {

    // Stop Mario movement
    isMovingLeft = false;
    isMovingRight = false;

    // Reset Mario position
    marioPosition = 0;
    mario.style.left = "0px";

    // Reset jump
    isJumping = false;

    // Reset score
    score.textContent = "0";

    // Reload the game
    location.reload();
}

window.addEventListener("keydown",(e)=>{
switch(e.key){
    case " ":
        case "w":
            case "W":
                case "ArrowUp":
        jump();
        break;
    case "ArrowLeft":
    case "a":
    case "A":
    isMovingLeft =true;
     break;
    case "ArrowRight":
    case "d":
    case "D":
    isMovingRight = true;
    break;
}
});
window.addEventListener("keyup",(e)=>{
switch(e.key){
    case "ArrowLeft":
        case "a":
            case "A":
                isMovingLeft =false;
                break;
    case "ArrowRight":
        case "d":
            case "D":
                isMovingRight = false;
                break;
}
})