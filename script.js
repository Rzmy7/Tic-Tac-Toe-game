let unchoosedIcon , choosedIcon,choosenID ,unchoosenID,bgc,txt,nextPlayer,count=0,gameOver=false;
let theme = false ,playerMode,done1=false,done2=false,choosedTeam,unchoosedTeam;
const boxMsg = document.getElementById("bigBox");
const allboxes = document.querySelectorAll('.data-Box');
const boxValues = ['box1', 'box2', 'box3','box4', 'box5', 'box6','box7', 'box8', 'box9'];
allboxes.forEach(box=>{
  box.classList.add("disabled");
})


function buttonColorChanger(theme){
    if (theme === true) {
        bgc = "#9bbabd";
        txt = "black";
    }else {
        bgc = "#184487";
        txt = "white";
    } 
    if ((choosenID)&&(unchoosenID)){
      choosenID.style.backgroundColor = bgc;
      unchoosenID.style.backgroundColor = "rgba(252, 3, 69,0.4)";
      choosenID.style.color = txt;
    }
    if((choosedTeam)&&(unchoosedTeam)){
      choosedTeam.style.backgroundColor = bgc;
      unchoosedTeam.style.backgroundColor = "rgba(252, 3, 69,0.4)";
      choosedTeam.style.color = txt;
    }
    
}



function playerChoose(player) {
    let choose = "";
    let unchoose = "";
    if (player === 1) {
        choose = "playerX";
        unchoose = "playerO";
        unchoosedIcon = "O";
        choosedIcon = "X";
    } else if (player === 2) {
        choose = "playerO";
        unchoose = "playerX";
        unchoosedIcon = "X";
        choosedIcon = "O";
    } else {
        console.log("invalid player");
    }
    //console.log("player" , choosedIcon);
    choosenID = document.getElementById(choose);
    unchoosenID = document.getElementById(unchoose);
    buttonColorChanger(theme); //change button colors
    choosenID.innerHTML = choosedIcon;
    unchoosenID.innerHTML = unchoosedIcon;
    choosenID.classList.add("disabled");
    unchoosenID.classList.add("disabled");
    done1 = true; //enabaling the boxes
    boxActivator();
    document.getElementById("user").innerHTML = "You are Player " + choosedIcon;
    nextPlayer = choosedIcon;
    document.getElementById("current-player").innerHTML = nextPlayer;
    document.getElementById("turn").hidden = false;
}


function gameMode(playerNums){
  let par;
  if (playerNums === 1) {
    playerMode = true;
    choosedTeam = document.getElementById('one-p');
    unchoosedTeam = document.getElementById('two-p'); 
    par = "Player vs. Computer";
  } else if (playerNums === 2) {
    playerMode = false;
    choosedTeam = document.getElementById('two-p');
    unchoosedTeam = document.getElementById('one-p');
    par = "Player vs. Player";
  }
  done2 = true;
  buttonColorChanger(theme);
  boxActivator();
  choosedTeam.classList.add("disabled");
  unchoosedTeam.classList.add("disabled");
  document.getElementById("game-mode").innerHTML = par;
}

function boxActivator(){
  if(done1 && done2){
    // boxActive.classList.remove("disabled");
    allboxes.forEach(box=>{
      box.classList.remove("disabled");
    })
  }
  
}

const themeSwitch = document.getElementById('theme-switch');
themeSwitch.addEventListener('change', () => {
  if (themeSwitch.checked) {
    // Dark theme
    document.body.classList.add('body-dark-theme');
    theme =true;
  } else {
    // Light theme
    document.body.classList.remove('body-dark-theme');
    theme=false;
  }
  if(choosenID) {
    buttonColorChanger(theme);
  }
  
});

function playerTurn() {
  if(nextPlayer === 'X'){
    nextPlayer = 'O';
  }else if(nextPlayer === 'O'){
   nextPlayer = 'X';
  }
  document.getElementById("current-player").innerHTML = nextPlayer;
  
}

const boxes = document.querySelectorAll('.data-Box');

boxes.forEach(box => {
  box.addEventListener('click', function() {
    //console.log(box.id);
    const index = boxValues.indexOf(box.id); // find the index 
    if (index !== -1) { // if the value is found
      boxValues.splice(index, 1, nextPlayer); // replace the value at the found index
    }
    //console.log(boxValues);
    count++;//no of clicked boxes
    box.innerHTML = nextPlayer;
    showWinner(isWin(),count);
    playerTurn();
    document.getElementById(box.id).classList.add('disabled');
    console.log("clicked");
    if((nextPlayer === unchoosedIcon)&&(!isWin())&&(playerMode)) {
      autoClick(autoClickPlacement()[0],autoClickPlacement()[1]);
    }
    
  });
});


function Reset(){
  window.location.reload();
}

function isWin() {
     if (count >= 3 && count<= 9){
       for(let i =0;i<=6;i+=3){
         if((boxValues[i]===boxValues[i+1])&& (boxValues[i] === boxValues[i+2]) ){
           return true;
           
        }
      }
      for(let i =0;i<=2;i++){
        if((boxValues[i]===boxValues[i+3])&& (boxValues[i] === boxValues[i+6]) ){
          return true;
          
        }
      }
      if((boxValues[0]===boxValues[4])&& (boxValues[0] === boxValues[8]) ){
        return true;
      }else if((boxValues[2]===boxValues[4])&& (boxValues[2] === boxValues[6])){
        return true;
      } return false;
    }else{
      return false;
    }
}

function showWinner(gameOver , index){
  //gameOver = isWin(count);
  if(gameOver){
        console.log("Player " + nextPlayer + " Won");
        allboxes.forEach(box=>{
          box.classList.add("disabled");
        })
        document.getElementById("winner").innerHTML = "Player " + nextPlayer + " Won";
        //alert("Player " + nextPlayer + " Won the match");
        document.getElementById("winner").hidden = false;
        document.getElementById("reset").hidden = false;
        
      }else if(!gameOver && index === 9){
        console.log("The match ia a Draw");
        document.getElementById("winner").innerHTML = "The match is a Draw";
        document.getElementById("winner").hidden = false;
        document.getElementById("reset").hidden = false;
        document.getElementById("turn").hidden = true;
      }
}

function autoClickPlacement(){
  if(count<9){
    let temp, bool = false, id = "null";
    let icons = [choosedIcon, unchoosedIcon];
    icons.forEach(icon => {
      for(let i = 0; i < 9; i++){
        if(boxValues[i] === 'X' || boxValues[i] === 'O'){
          continue;
        } else {
          temp = boxValues[i];
          boxValues[i] = icon;
          if(isWin()){
            boxValues[i] = temp;
            bool = true;
            id = temp;
          }boxValues[i] = temp;
        }
      }
    });
  if(!bool){
    bool = true;
    id = boxValues[randomBoxNum()];
  }
  
  return [bool, id];
  }

}


//playersla choose karana ekai , eka move ekak tiyeddi player dinnama computer eke move eka balala won eka pennana siddiyak tiyenw wge
//ehema ekk tiye.dinnata passe autoclick wena eka nathara krnna one.

function randomBoxNum(){
  let randomNumber;
  while(true){
    
    randomNumber = Math.floor(Math.random() * 9);
    //console.log("here too", randomNumber);
    if(boxValues[randomNumber] !== 'X' && boxValues[randomNumber] !== 'O'){
      return randomNumber;
    }
  }
}



function autoClick(bool,id){
  if(bool){
    setTimeout(function() {
      document.getElementById(id).click();// code to be executed after 2 seconds
    }, 500);
    
  }
  
}