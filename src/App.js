import { useState, useEffect} from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages=[
  {"src":"/img/helmet-1.png", matched:false},
  {"src":"/img/potion-1.png", matched:false},
  {"src":"/img/ring-1.png", matched:false},
  {"src":"/img/scroll-1.png", matched:false},
  {"src":"/img/shield-1.png", matched:false},
  {"src":"/img/sword-1.png", matched:false}
]

function App() {
  const[cards,setCards]=useState([])
  const[turns,setTurns]=useState(0)
  const[choiceOne, setChoiceOne]=useState(null)
  const[choiceTwo, setChoiceTwo]=useState(null)
  const[disabled,setDisabled]=useState(false)
  const[points,setPoints]=useState(0);
  const[winner,setWinner]=useState(false)

  const shuffleCards=()=>{
    const shuffledCards=[...cardImages,...cardImages]
      .sort(()=>Math.random()-0.5)
      .map((card)=>({...card, id:Math.random()}))
    setChoiceOne(null)
    setChoiceTwo(null)  
    setCards(shuffledCards)
    setTurns(0)
    setPoints(0)
    setWinner(false)
  }

  const handleChoice=(card)=>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if(choiceOne && choiceTwo)
    {
      setDisabled(true)
      if(choiceOne.src==choiceTwo.src)
      {
        setPoints(prevPoints=>prevPoints+1)
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.src===choiceOne.src)
            {
              return {...card, matched:true}
            }
            else{
              return card
            }
          })
        })
        setTimeout(()=>restTurns(),1000)
      }
      else
      {
        setTimeout(()=>restTurns(),1000)
      }
    }
  }, [choiceOne,choiceTwo])

  useEffect(() => {
    if (points === cardImages.length) {
      setWinner(true);
    }
  }, [points, cardImages.length]);

  const restTurns=()=>{
    setChoiceOne(0)
    setChoiceTwo(0)
    setTurns(prevTurns=>prevTurns+1)
    setDisabled(false)
  }
  return (
    <div className="App">
      <h1>Magic match</h1>
      <button onClick={shuffleCards}>New game</button>
      {winner && <p className='winner'>Completed!</p>}
      {winner && <p>With {turns} turns. Tap new game to try again.</p>}
      <div className='card-grid'>
        {cards.map(card=>(
          <SingleCard key={card.id} card={card} handleChoice={handleChoice}
          flipped={card===choiceOne || card===choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
    </div>
    <div className='line'>
      <p>Turns:{turns}</p>
      <p>Ponits:{points}</p>
    </div>
    </div>
  );
}
export default App;