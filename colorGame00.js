const Square = ({id, player, newState}) => {
  const [color, setColor] = React.useState('green');
  const palet = ['blue', 'red'];
  const [status, setStatus] = React.useState(null);

  //React.useEffect(() => {
  //  console.log(`render ${id}`);
  //  return () => console.log(`unmounting ${id}`);
  //})

  const xo = () => {
    if(player === 1){
      setStatus('X');
      return 'X';
    } else { 
      setStatus('O');
      return 'O';
    }

  }

  return (
    <button onClick={(e) => {
      let col = (palet[player-1]);
      setColor(palet[player-1]);
      e.target.style.background=col;
      let icon = xo();
      newState(id, icon);
    }}>{status}</button>
  );
};

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [mounted, setMounted] = React.useState(true);
  const [random, setRandom] = React.useState(0);
  const [state, setState] = React.useState([Array(9).fill(null)]);
  const [winner, setWinner] = React.useState(null);
  let status = `Player ${player}`;

  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 5, 6],
  ];

  React.useEffect (() => {
    for(let i=0; i<win.length; i++){
      let temp = win[i];
      if(state[temp[0]] === state[temp[1]] && state[temp[1]] === state[temp[2]] && state[temp[0]] === state[temp[2]] && state[temp[0]] != null){
        if(player === 2){
          setWinner(1);
        } else { setWinner(2) }
      }
    }
    
  }, [player]);

  const newState = (idOfSquare, icon) => {
    state[idOfSquare] = icon;
    setState(state);
  }

  function renderSquare(i) {
    return <Square id={i} player={player} newState={newState}></Square>;
  }
  const toggle = () => {
    setMounted(!mounted);
    setWinner(false);
    setState([Array(9).fill(null)]);
    console.log(mounted);
  }
  const reRender = () => {
    setRandom(Math.random());
    //console.log(random);
  }

  return (
    <div
      className="game-board"
      onClick={(e) => {
        setPlayer((player + 1)%2 === 0 ? 2 : 1);
        status = `Player ${player}`;
      }}
    >
      <div className="grid-row">
        {mounted && renderSquare(0)}
        {mounted && renderSquare(1)}
        {mounted && renderSquare(2)}
      </div>
      <div className="grid-row">
        {mounted && renderSquare(3)}
        {mounted && renderSquare(4)}
        {mounted && renderSquare(5)}
      </div>
      <div className="grid-row">
        {mounted && renderSquare(6)}
        {mounted && renderSquare(7)}
        {mounted && renderSquare(8)}
      </div>
      <div id="info">
      <button onClick={toggle}>Show/Hide Row</button>
      <button onClick={reRender}>Re-render</button>
        {!winner && <h1>{status}</h1>}
      </div>
      {winner && <h1>The winner is Player {winner}</h1>}
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
