import { useNavigate } from "react-router-dom";
import pawn from "../../assets/images/pawn.png";
import { PublicMain, LogoBox, FormBox } from "../../assets/styles/styles";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <PublicMain>
        <LogoBox>
          <img src={pawn} alt="Pawn chess white and green" />
          <h1>MoveMentor</h1>
          <h2>Aprenda xadrez de forma interativa</h2>
        </LogoBox>
        <FormBox>
          <h2>
            <span>DESAFIE SEU CÉREBRO</span> COM O JOGO MAIS ESTRATÉGICO DO
            MUNDO!
          </h2>
          <h3>
            Inscreva-se agora no MoveMentor e aprimore suas habilidades de
            xadrez com nossas aulas interativas. Domine as táticas mais
            avançadas, surpreenda seus adversários e se torne um verdadeiro
            mestre do tabuleiro. Não espere mais, seu próximo movimento pode ser
            o mais importante.
          </h3>
        </FormBox>
      </PublicMain>
    </>
  );
}
