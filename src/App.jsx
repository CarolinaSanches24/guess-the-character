import "./App.css";

//hooks
import { useCallback, useEffect, useState } from "react";

//data
import { listaPalavras } from "./data/character";

//components
import { StartScreen } from "./components/StartScreen";
import { Game } from "./components/Game";
import { GameOver } from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [palavras] = useState(listaPalavras);

  const [palavraEscolhida, setPalavraEscolhida] = useState("");
  const [categoriaEscolhida, setCategoriaEscolhida] = useState("");
  const [letras, setLetras] = useState([]);

  const [adivinhouLetras, setAdivinhouLetras] = useState([]);
  const [errouLetras, setErrouLetras] = useState([]);
  const [tentativas, setTentativas] = useState(3);
  const [pontuacao, setPontuacao] = useState(0);

  const escolhePalavraCategoria = useCallback(() => {
    // escolhe uma categoria uma palavra aleatoria
    const categories = Object.keys(palavras);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word =
      palavras[category][Math.floor(Math.random() * palavras[category].length)];

    return { category, word };
  }, [palavras]);

  const startGame = useCallback(() => {
    // limpa todas as letras
    clearLettersStates();

    const { category, word } = escolhePalavraCategoria();

    let arrayLetras = word.split("");

    arrayLetras = arrayLetras.map((l) => l.toLowerCase());

    setCategoriaEscolhida(category);
    setPalavraEscolhida(word);
    setLetras(arrayLetras);

    setGameStage(stages[1].name); // Altera o estágio do jogo para "game"
  }, [escolhePalavraCategoria]);

  const verificaLetra = (letra) => {
    const letraNormalizada = letra.toLowerCase();

    // checa se a letra ja foi utilizada
    if (
      adivinhouLetras.includes(letraNormalizada) ||
      errouLetras.includes(letraNormalizada)
    ) {
      return;
    }

    //mostra a letra adivinhada
    if (letras.includes(letraNormalizada)) {
      setAdivinhouLetras((atuaisLetrasAdivinhadas) => [
        ...atuaisLetrasAdivinhadas,
        letra.toLowerCase(),
      ]);
    } else {
      setErrouLetras((atuaisLetrasErradas) => [
        ...atuaisLetrasErradas,
        letraNormalizada,
      ]);

      setTentativas((tentativaAtual) => tentativaAtual - 1);
    }
  };

  // reinicia o jogo
  const retry = () => {
    setPontuacao(0);
    setTentativas(3);
    setGameStage(stages[0].name); // Retorna para o estágio inicial
  };

  // limpa o estado das letras
  const clearLettersStates = () => {
    setAdivinhouLetras([]);
    setErrouLetras([]);
  };

  // check if guesses ended
  useEffect(() => {
    if (tentativas === 0) {
      // game over and reset all states
      clearLettersStates();

      setGameStage(stages[2].name);
    }
  }, [tentativas]);

  // check win condition
  useEffect(() => {
    const letrasUnicas = [...new Set(letras)];

    // win condition
    if (adivinhouLetras.length === letrasUnicas.length) {
      // add score
      setPontuacao((pontuacaoAtual) => (pontuacaoAtual += 100));

      // restart game with new word
      startGame();
    }
  }, [adivinhouLetras, letras, startGame]);

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}{" "}
      {/* Inicia com a StartScreen */}
      {gameStage === "game" && (
        <Game
          verificaLetra={verificaLetra}
          palavraEscolhida={palavraEscolhida}
          categoriaEscolhida={categoriaEscolhida}
          letras={letras}
          adivinhouLetras={adivinhouLetras}
          errouLetras={errouLetras}
          tentativas={tentativas}
          pontuacao={pontuacao}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={pontuacao} />}
    </div>
  );
}

export default App;
