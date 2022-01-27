// import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom, selectedCoin } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  /* padding: 100px 0px; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding-right: 20px;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  grid-column: 2 / 3;
  place-self: center;
`;

const DarkToggle = styled.button`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 30%;
  place-self: center;
  justify-self: flex-end;
  border-radius: 5px;
  padding: 15px;
  span {
    font-size: 12px;
  }
`;

const CoinsList = styled.ul``;
const CoinCard = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border: solid 1px ${(props) => props.theme.textColor};

  border-radius: 15px;
  margin-bottom: 10px;
  img {
    height: 40px;
    width: 40px;
    margin-right: 10px;
  }
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    /* display: block; */
    display: flex;
    align-items: center;
  }
  &:hover {
    border: solid 1px ${(props) => props.theme.accentColor};
    a {
      color: ${(props) => props.theme.accentColor};
      font-weight: 500;
    }
  }
`;

const Loader = styled.span`
  text-align: center;
`;

// -------- fucntion --------

function Coins() {
  interface coinsState {
    id: string;
    is_active: boolean;
    is_new: boolean;
    name: string;
    rank: number;
    symbol: string;
    type: string;
  }

  const { isLoading, data } = useQuery<coinsState[]>("allCoins", fetchCoins);

  // const [coins, setCoins] = useState<coinsState[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  // console.log(coins);

  const [DarkAtom, setDarkAtom] = useRecoilState(isDarkAtom);
  const setCoin = useSetRecoilState(selectedCoin);

  const onClick = (coinId: string, name: string) => {
    setCoin({ id: coinId, name });
  };

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <DarkToggle onClick={() => setDarkAtom((prev) => !prev)}>
          <span>{DarkAtom ? "white mode" : "dark mode"}</span>
        </DarkToggle>
      </Header>
      <CoinsList>
        {isLoading ? (
          <Loader>loading...</Loader>
        ) : (
          data?.slice(0, 100).map((coin) => (
            <CoinCard key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}/chart`,
                  state: { name: coin.name },
                }}
                onClick={() => onClick(coin.id, coin.name)}
              >
                <img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt=""
                />
                <div>{coin.name} &rarr;</div>
              </Link>
            </CoinCard>
          ))
        )}
      </CoinsList>
    </Container>
  );
}

export default Coins;
