import styled from "@emotion/styled";
import Error from "./Error";

import useSelectCoins from "../hooks/useSelectCoins";
import { useEffect, useState } from "react";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.2rem;
  border-radius: 5px;
  margin-top: 30px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Form = ({ setCoins }) => {
  const coins = [
    { id: "USD", name: "Dólar de Estados Unidos" },
    { id: "MXN", name: "Peso mexicano" },
    { id: "EUR", name: "Euro" },
    { id: "GBP", name: "Libra Esterlina" },
  ];

  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [coin, SelectCoins] = useSelectCoins("Elige tu Moneda", coins);
  const [criptocoin, SelectCriptocoin] = useSelectCoins(
    "Elige tu Criptomoneda",
    criptos
  );

  useEffect(() => {
    const consultAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const response = await (await fetch(url)).json();

      const arrayCriptos = response.Data.map((cripto) => {
        const obj = {
          id: cripto.CoinInfo.Name,
          name: cripto.CoinInfo.FullName,
        };

        return obj;
      });
      setCriptos(arrayCriptos);
    };

    consultAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([coin, criptocoin].includes("")) {
      setError(true);
      return;
    }

    setError(false);
    setCoins({ coin, criptocoin });
  };

  return (
    <>
      {error && <Error>Todos los campos con obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCoins />
        <SelectCriptocoin />
        <InputSubmit type='submit' value='Cotizar' />
      </form>
    </>
  );
};

export default Form;
