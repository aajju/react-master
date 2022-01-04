// import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

function Coins() {
  const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  `;
  const Header = styled.header`
    height: 10vh;
    padding: 100px 0px;
    display: flex;
    justify-content: center;
    position: relative;
    /* align-items: center; */
  `;

  const DarkToggle = styled.button`
    font-size: 20px;
    position: absolute;
    left: 0px;
    top: 10px;
    display: block;
  `;
  const Title = styled.h1`
    font-size: 60px;
    display: block;
  `;
  const CoinsList = styled.ul``;
  const CoinCard = styled.li`
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
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
      a {
        color: ${(props) => props.theme.accentColor};
      }
    }
  `;

  const Loader = styled.span`
    text-align: center;
  `;

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

  const setDarkAtom = useSetRecoilState(isDarkAtom);

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <DarkToggle onClick={() => setDarkAtom((prev) => !prev)}>
          mode change
        </DarkToggle>
        <Title>Coins</Title>
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
