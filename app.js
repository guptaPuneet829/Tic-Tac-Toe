const gameBox=document.querySelector("#gamebox");
const displayInfo=document.querySelector("#info");
const boxCells=[ "", "", "", "", "", "", "", "", ""];
let shape="cross";
displayInfo.textContent="Cross Takes Turn First";

function createBox(){
    boxCells.forEach((cells,index) => {
        const cellElement=document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id=index;
        cellElement.addEventListener("click",draw);
        gameBox.append(cellElement);
    });
}
createBox();
function draw(e){
    const cellContent=document.createElement('div');
    cellContent.classList.add(shape);
    e.target.append(cellContent);
    shape= shape=="cross"?"circle":"cross";
    displayInfo.textContent="Now It's Time To "+shape+" Turn.";
    e.target.removeEventListener("click",draw);
    checkWinner();
}

function checkWinner(){
    const allSquares=document.querySelectorAll(".square");
    const winningCombos=[
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    // for circle wins
    winningCombos.forEach(arr=>{
        const circleWins=arr.every(cell=>
            allSquares[cell].firstChild?.classList.contains("circle"));
        if(circleWins){
            displayInfo.textContent="Circle Wins!!";
            allSquares.forEach(sqaure=>sqaure.replaceWith(sqaure.cloneNode(true)));
            return;
        }
    })
    // for cross wins
    winningCombos.forEach(arr=>{
        const crossWins=arr.every(cell=>
            allSquares[cell].firstChild?.classList.contains("cross"));
        if(crossWins){
            displayInfo.textContent="Cross Wins!!";
            allSquares.forEach(sqaure=>sqaure.replaceWith(sqaure.cloneNode(true)));
            return;
        }
    })
}
function reload(){
    window.location.reload();
}
