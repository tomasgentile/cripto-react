import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useSelectCoins from '../hooks/useSelectCoins';
import { coins } from '../data/coins';
import Error from './Error';

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: 0.3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Form = ({setCoins}) => {
    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);

    // retorna por indice del arreglo exportado en useSelectCoin. Si fuera destructuring tendria que ser el mismo nombre
    const [coin, SelectCoins] = useSelectCoins('Elige tu moneda', coins);
    const [criptoCoin, SelectCriptoCoin] = useSelectCoins('Elige tu criptomoneda', criptos);

    useEffect(() => {
        const consultAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';
            const response = await fetch(url);
            const result = await response.json();
            const arratCryptos = result.Data.map(cripto => {
                const object = {
                    id: cripto.CoinInfo.Name,
                    name: cripto.CoinInfo.FullName
                }
                return object;
            });
            setCriptos(arratCryptos);
        }
        consultAPI();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([coin, criptoCoin].includes('')) {
            setError(true);
            return
        }
        setError(false);
        setCoins({
            coin,
            criptoCoin
        });
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit}>
                <SelectCoins />
                <SelectCriptoCoin />

                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    )
}

export default Form