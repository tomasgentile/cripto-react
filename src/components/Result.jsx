import styled from '@emotion/styled';

const ResultContainer = styled.div`
  color: #FFF;
  font-family: 'Lato', sans-serif;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 30px;
`

const Text = styled.p`
    font-size: 18px;
  span {
    font-weight: 700;
  }
`

const Price = styled.p`
  font-size: 24px;
  span {
    font-weight: 700;
  }
`

const Image = styled.img`
  display: block;
  width: 120px;
`

const PercentageColor = styled.span`
  color: ${props => props.value >= 0 ? '#FFF' : 'red'};
`

const Result = ({ quoteResult }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = quoteResult;
  console.log(CHANGEPCT24HOUR)

  return (
    <ResultContainer>
      <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="Imagen cripto" />
      <div>
        <Price>El precio es de: <span>{PRICE}</span></Price>
        <Text>Precio más alto del día: {''}<span>{HIGHDAY}</span></Text>
        <Text>Precio más bajo del día: <span>{LOWDAY}</span></Text>
        <Text>Variación ultimas 24 horas: {''}
          <PercentageColor value={CHANGEPCT24HOUR}>{CHANGEPCT24HOUR}%</PercentageColor>
        </Text>
        <Text>Ultima actualización: {''}<span>{LASTUPDATE}</span></Text>
      </div>
    </ResultContainer>
  )
}

export default Result