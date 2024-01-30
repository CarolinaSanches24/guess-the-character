import styles from "./Game.module.css";
import { useState, useRef } from "react";
export const Game = ({
  verificaLetra,
  categoriaEscolhida,
  letras,
  adivinhouLetras,
  errouLetras,
  tentativas,
  pontuacao,
}) => {
  const [letra, setLetra] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    verificaLetra(letra);

    setLetra("");

    letterInputRef.current.focus();
  };

  return (
    <div className={styles.game}>
      <p className={styles.game_points}>
        <span>Pontuação: {pontuacao}</span>
      </p>
      <h1 className={styles.game_title}>Adivinhe a palavra:</h1>
      <h3 className={styles.game_tip}>
        Dica é um personagem do Anime:<span>{categoriaEscolhida}</span>
      </h3>
      <p>Você ainda tem {tentativas} tentativa(s).</p>
      <div className={styles.wordContainer}>
        {letras.map((letra, i) =>
          adivinhouLetras.includes(letra) ? (
            <span className={styles.letter} key={i}>
              {letra}
            </span>
          ) : (
            <span key={i} className={styles.blankSquare}></span>
          )
        )}
      </div>
      <div className={styles.letterContainer}>
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letra"
            maxLength="1"
            onChange={(e) => setLetra(e.target.value)}
            required
            value={letra}
            ref={letterInputRef}
          />

          <button>Jogar!</button>
        </form>
      </div>
      <div className={styles.wrongLettersContainer}>
        <p>Letras já utilizadas:</p>
        {errouLetras.map((letra, i) => (
          <span key={i}>{letra}, </span>
        ))}
      </div>
    </div>
  );
};
