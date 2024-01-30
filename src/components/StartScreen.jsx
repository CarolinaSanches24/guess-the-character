import styles from "./StartScreen.module.css";

export const StartScreen = ({ startGame }) => {
  return (
    <section className="start">
      <h2 className={styles.start_title}>Guess the Character</h2>
      <p lang="pt-br" className={styles.start_paragrafo}>
        Clique no botão abaixo para começar a jogar
      </p>
      <button
        lang="pt-br"
        title="Botão começar o jogo"
        className={styles.button_start}
        onClick={startGame}
      >
        Começar o jogo
      </button>
    </section>
  );
};
