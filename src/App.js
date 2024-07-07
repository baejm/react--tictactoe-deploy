import { useState } from "react";
import "./App.css"
import Board from "./components/Board";

function App() {

  const [history, setHistory] = useState([{squares:new Array(9).fill(null)}])
  const [xIsNext, setxIsNext] = useState(true)
  const [stepNumber, setstepNumber] = useState(0)
  
  const calculateWinner =(squares)=>{
    const lines=[
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let index = 0; index < lines.length; index++) {
      const [a,b,c] = lines[index];
      if(squares[a] && squares[a]=== squares[b] && squares[a]=== squares[c]){
        return squares[a]
      }
    }
    return null
  }

  const current= history[stepNumber]
  const winner = calculateWinner(current.squares)

  let status
if(winner){
  status = `승자는 ${winner}에요`
}else{
  status = `다음 선수는 ${xIsNext ? 'X' : 'O'}`
} 


const handleClick =(i)=>{
  const newHistory = history.slice(0,stepNumber + 1);
  const newCurrent = newHistory[newHistory.length-1]
  const newSquares = [...newCurrent.squares]

  if(calculateWinner(newSquares) || newSquares[i]) return

  newSquares[i] = xIsNext ? 'X' : 'O'
  setHistory([...newHistory,{squares:newSquares}])
  setxIsNext(prev => !prev)

  setstepNumber(newHistory.length)
} 


const moves = history.map((step,index)=>{
  const desc = index ? `${index} 번째로 점프` : '시작';
  return (
    <li key={index}>
      <button className="move-button" onClick={()=>jumpTo(index)}>{desc}</button>
      {/* <button onClick={history[index].squares}>{desc}</button> */}
    </li>
  );
})

const jumpTo = (index) =>{
  setstepNumber(index)
  setxIsNext(index % 2 === 0)
}

const clickNotice =  moves.length > 1 ? null : '왼쪽 판에 클릭해주세요.';



  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={ i=>{handleClick(i)}}></Board>
      </div>
      <div className="game-info">
        <div className="status">{status}</div> 
        <div>{ clickNotice }</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
