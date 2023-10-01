
import './App.css'
import { useEffect, useState } from 'react';
import bluecandy from "./assets/blue-candy.png"
import greencandy from "./assets/green-candy.png"
import orangecandy from "./assets/orange-candy.png"
import purplecandy from "./assets/purple-candy.png"
import redcandy from "./assets/red-candy.png"
import yellowcandy from "./assets/yellow-candy.png"
import blank from "./assets/dot.png"
import ScoreBoard from './Components/ScoreBoard';
import candySound from './assets/crush.mp3'

const width = 8;
const candycolors = [redcandy,bluecandy,greencandy,yellowcandy, purplecandy, orangecandy, ]

const  App = () =>{
 
  //Making states to manage controls
 const [currentColorArrangement, setCurrentColorArrangement] = useState([])
const [squareBeingDragged, setSquareBeingDragged] = useState(null);
const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
const [scoreDisplay, setScoreDisplay] = useState(0)
const [moves, setMoves] = useState(0)



// Check for coloumn of three
const checkForColoumnOfThree = ()=>{
  for(let i = 0; i <= 47; i++){
    const coloumnOfThree = [i, i + width, i + width * 2]
    const decideColors = currentColorArrangement[i]
    const isBlank = currentColorArrangement[i] === blank
    if(coloumnOfThree.every(square => currentColorArrangement[square] === decideColors && !isBlank)){
      setScoreDisplay((score)=> score + 3)
      coloumnOfThree.forEach(square => currentColorArrangement[square] = blank)
      return true
    }
  }
}


// Check for coloumn of four

const checkForColoumnOfFour = ()=>{
  for(let i = 0; i <= 39; i++){
    const coloumnOfFour = [i, i + width, i + width * 2, i + width * 3]
    const decideColors = currentColorArrangement[i]
    const isBlank = currentColorArrangement[i] === blank
    if(coloumnOfFour.every(square => currentColorArrangement[square] === decideColors && !isBlank)){

      setScoreDisplay((score)=> score + 4)
      coloumnOfFour.forEach(square => currentColorArrangement[square] = blank )
      return true
    }
  }
}


// Check for row of three

const checkForRowOfThree = ()=>{
  for(let i = 0; i < 64; i++){
    const rowOfThree = [i, i + 1, i +2 ]
    const decideColors = currentColorArrangement[i]
    const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
    const isBlank = currentColorArrangement[i] === blank

    if(notValid.includes(i)) continue


    if(rowOfThree.every(square => currentColorArrangement[square] === decideColors && !isBlank)){
      setScoreDisplay((score)=> score + 3)
      rowOfThree.forEach(square => currentColorArrangement[square] = blank )
      return true
    }
  }
}


// Check for row of Four

const checkForRowOfFour = ()=>{
  for(let i = 0; i < 64; i++){
    const rowOfFour = [i, i + 1, i +2, i + 3 ]
    const decideColors = currentColorArrangement[i]
    const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
    const isBlank = currentColorArrangement[i] === blank

    if(notValid.includes(i)) continue


    if(rowOfFour.every(square => currentColorArrangement[square] === decideColors && !isBlank)){
      setScoreDisplay((score)=> score + 4)
      rowOfFour.forEach(square => currentColorArrangement[square] = blank )
      return true
    }
  }
}

// Function to move downand fill up the empty rows and coloumn 

const moveIntoSqaureDown = ()=>{
  for (let i = 0; i <= 55 ; i++){
const firstRow  = [0,1,2,3,4,5,6,7];
const isFirstRow  = firstRow.includes(i)

if(isFirstRow && currentColorArrangement[i] === blank ){
   // Play the sound effect here
   const soundEffect = new Audio(candySound);
   soundEffect.play();
  let randomNumber = Math.floor(Math.random() * candycolors.length)
  currentColorArrangement[i] = candycolors[randomNumber]
}


    if((currentColorArrangement[i + width]) === blank ){
currentColorArrangement[i + width] = currentColorArrangement[i]
currentColorArrangement[i] = blank
    }
  }
}


// Drag Start fucntion
const dragStart = (e)=>{
  
setSquareBeingDragged(e.target)
}

// Drag Dropfucntion
const dragDrop = (e)=>{
 
  
 setSquareBeingReplaced(e.target)
}

// Drag End fucntion
const dragEnd = (e)=>{
 
  const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
  const squareBeingReplacedId = parseInt( squareBeingReplaced.getAttribute('data-id'))

  currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')
  currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')


// Making valid moves
const validMoves = [
  squareBeingDraggedId - 1,
  squareBeingDraggedId - width,
  squareBeingDraggedId + 1,
  squareBeingDraggedId + width
]
// Making valid moves constants
const validMove = validMoves.includes(squareBeingReplacedId)
const isColoumnOfFour = checkForColoumnOfFour();
const isColoumnOfThree = checkForColoumnOfThree();
const isRowOfFour= checkForRowOfFour();
const isRowOfThree = checkForRowOfThree();


if(
  squareBeingReplacedId &&
  validMove &&
  (isColoumnOfFour || isColoumnOfThree || isRowOfFour || isRowOfThree)
) {
  setMoves(moves + 1)
  setSquareBeingDragged(null)
  setSquareBeingReplaced(null)
}
else{
  currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
  currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
  setCurrentColorArrangement([...currentColorArrangement])
}

}






// Creating main board to display the structure of game
  const createBoard = ()=>{
    const randomNumberArrangment = []
    for(let i = 0; i < width * width; i++){
    
const randomColor = candycolors[Math.floor(Math.random() * candycolors.length)]
randomNumberArrangment.push(randomColor)
    }
    setCurrentColorArrangement(randomNumberArrangment)
   
  }




  //Our useEffect function that renders all the main process running to control the gameplay
useEffect(() =>{
const timer = setInterval(()=>{
  checkForColoumnOfFour()
  checkForColoumnOfThree()
  checkForRowOfThree()
  checkForRowOfFour()
  moveIntoSqaureDown()
  setCurrentColorArrangement([...currentColorArrangement])
}, 150)
return () => clearInterval(timer)


}, [checkForColoumnOfFour, checkForColoumnOfThree,checkForRowOfFour,checkForRowOfThree,moveIntoSqaureDown, currentColorArrangement])


// useEffect to render the baord fucntion 
  useEffect(()=>{
   
    
    createBoard();
  }, [])


  // const themeAudio  = new Audio(themeSound)
  // useEffect(() => {
  //   // Start playing the theme music when the component mounts
  //   themeAudio.play();

  //   // Stop the theme music when the component unmounts
  //   return () => {
  //     themeAudio.pause();
  //     themeAudio.currentTime = 0; // Reset audio to the beginning
  //   };
  // }, []);
  return (
    <>
      <div className='container'>
      
       <div className="game-board">
       {
        currentColorArrangement.map((candycolors, index)=>(
<img key={index} 
      src={candycolors}
      data-id={index}
      draggable={true}
      alt={candycolors}
      onDragStart={dragStart}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
      onDragLeave={(e) => e.preventDefault()}
      onDrop={dragDrop}
      onDragEnd={dragEnd}
/>

        ))
       }
         <audio id="theme-audio" src="./assets/theme.mp3" autoplay></audio>


       </div>

      <ScoreBoard moves={moves}  score={scoreDisplay}/>
      </div>
      
    </>
  )
}

export default App
