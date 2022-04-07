import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ImgCripto from './img/imagen-criptos.png';
import Form from './components/Form';
import Result from './components/Result';
import Spinner from './components/Spinner';

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  width: 90%;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

function App() {
  const [coins, setCoins] = useState({});
  const [quoteResult, setquoteResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(coins).length > 0) {
      const { coin, criptoCoin } = coins;

      const criptoQuote = async () => {
        setLoading(true);
        setquoteResult({});
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoCoin}&tsyms=${coin}`;
        const response = await fetch(url);
        const result = await response.json();
        setquoteResult(result.DISPLAY[criptoCoin][coin]);
        setLoading(false);
      }
      criptoQuote();
    }
  }, [coins])


  return (
    <Container>
      <Image src={ImgCripto} />

      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Form setCoins={setCoins} />
        
        {loading && <Spinner/>}
        {quoteResult.PRICE && <Result quoteResult={quoteResult} />}
      </div>

    </Container>
  )
}

export default App
