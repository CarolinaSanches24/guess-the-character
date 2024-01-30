import styles from "./GameOver.module.css";

export const GameOver = ({ retry, score }) => {
  return (
    <div>
      <h1 className={styles.title}>fim de Jogo !</h1>
      <h2>
        A sua pontuação foi:<span>{score}</span>
      </h2>
      <button lang="pt-BR" onClick={retry}>
        Resetar Jogo
      </button>
    </div>
  );
};
