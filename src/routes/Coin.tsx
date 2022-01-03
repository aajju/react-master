import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Router from "../Router";
import Chart from "./Chart";
import Price from "./Price";

function Coin() {
  const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
    height: 200vh;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  `;
  const Header = styled.header`
    height: 10vh;
    padding: 100px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const Title = styled.h1`
    font-size: 60px;
    display: block;
    margin-bottom: 20px;
  `;
  const Loader = styled.span`
    text-align: center;
  `;

  const OverView = styled.div`
    background-color: darkgray;
    width: 90%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    padding: 00px 40px;
    margin-bottom: 30px;
  `;

  const OverViewItem = styled.div`
    /* background-color: yellowgreen; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    & span:first-child {
      font-size: 12px;
      text-transform: uppercase;
    }
  `;

  const Description = styled.div`
    display: flex;
    font-size: 12px;
    /* text-align: center; */
    width: 90%;
    margin: auto;
    margin-bottom: 30px;
  `;

  const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 90%;
    margin: auto;
    justify-content: space-evenly;
  `;

  const Tab = styled.div<{ isActive: boolean }>`
    background-color: darkgray;
    text-align: center;
    text-transform: uppercase;
    padding: 20px 0px;
    border-radius: 15px;

    a {
      display: block;
      color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
    }
  `;

  interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
  }

  interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  }

  interface RouteParams {
    coinId: string;
  }

  interface RouteState {
    name: string;
  }

  const { coinId } = useParams<RouteParams>();
  // const { name } = useLocation().state as RouteState;
  // console.log(name);
  const { state } = useLocation<RouteState>();
  // console.log(state?.name);
  const chartMatch = useRouteMatch("/:coinId/chart");
  const priceMatch = useRouteMatch("/:coinId/price");
  console.log(chartMatch, priceMatch);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );

  const loading = infoLoading || tickersLoading;
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>loading...</Loader>
      ) : (
        <>
          <OverView>
            <OverViewItem>
              <span>rank</span>
              <span>{infoData?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>symbol</span>
              <span>{infoData?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>open source</span>
              <span>{infoData?.open_source ? "yes" : "no"}</span>
            </OverViewItem>
          </OverView>

          <Description>{infoData?.description}</Description>

          <OverView>
            <OverViewItem>
              <span>total supply</span>
              <span>{tickersData?.total_supply.toLocaleString()}</span>
            </OverViewItem>

            <OverViewItem>
              <span>max supply</span>
              <span>{tickersData?.max_supply.toLocaleString()}</span>
            </OverViewItem>
          </OverView>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path="/:coinId/chart">
              <Chart />
            </Route>
            <Route path="/:coinId/price">
              <Price />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
