import { useQuery } from "react-query";
import {
  Switch,
  Route,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers, InfoData, PriceData } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import { Helmet } from "react-helmet";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  height: 120vh;
`;

const Header = styled.header`
  height: 10vh;
  /* padding: 100px 0px; */
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  place-content: center;
  padding: 0 20px;
  gap: 20px;
`;

const Back = styled.button<{ isDark: boolean }>`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 30%;
  justify-self: start;
  align-self: center;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  font-size: 30px;
  font-weight: 500;
  background-color: ${(props) =>
    props.isDark ? props.theme.textColor : props.theme.bgColor};
  color: ${(props) => props.theme.accentColor};
  text-align: center;
`;
const Title = styled.h1`
  font-size: 30px;
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
  justify-self: start;
  border-radius: 5px;
  padding: 15px;
  span {
    font-size: 12px;
  }
`;

const Loader = styled.span`
  text-align: center;
`;

const OverView = styled.div`
  /* background-color: black; */
  width: 90%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding: 00px 40px;
  margin-bottom: 30px;
  border: 1px solid ${(props) => props.theme.textColor};
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
  font-size: 15px;
  /* text-align: center; */
  width: 90%;
  margin: auto;
  margin-bottom: 30px;
  line-height: 1.3;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 90%;
  margin: auto;
  justify-content: space-evenly;

  margin-bottom: 40px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  /* background-color: black; */
  text-align: center;
  text-transform: uppercase;
  border-radius: 15px;
  border: solid 1px
    ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
    height: 100%;
    padding: 20px 0px;

    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

// ------ function ------

function Coin() {
  const { coinId } = useParams<RouteParams>();
  console.log(coinId);
  // const { name } = useLocation().state as RouteState;
  // console.log(name);
  const { state } = useLocation<RouteState>();
  // console.log(state?.name);
  const chartMatch = useRouteMatch("/:random1/chart");
  const priceMatch = useRouteMatch("/:random2/price");
  // console.log(chartMatch, priceMatch);
  const [DarkAtom, setDarkAtom] = useRecoilState(isDarkAtom);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => {
      return fetchCoinInfo(coinId);
    }
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => {
      return fetchCoinTickers(coinId);
    }
  );
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state?.name : loading ? "Loading..." : "abc"}
        </title>
      </Helmet>
      <Header>
        <Back isDark={DarkAtom}>
          <Link to={`/`}>&#60; </Link>
        </Back>

        <Title>
          {state?.name ? state?.name : loading ? "Loading..." : infoData?.name}
        </Title>
        <DarkToggle onClick={() => setDarkAtom((prev) => !prev)}>
          <span>{DarkAtom ? "white mode" : "dark mode"}</span>
        </DarkToggle>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <OverView>
            <OverViewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>symbol</span>
              <span>{infoData?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverViewItem>
          </OverView>

          <Description>{infoData?.description}</Description>
          <OverView>
            <OverViewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverViewItem>
          </OverView>

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
              <Link
                to={{
                  pathname: `/${coinId}/chart`,
                  state: { name: infoData?.name },
                }}
              >
                chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link
                to={{
                  pathname: `/${coinId}/price`,
                  state: { name: infoData?.name },
                }}
              >
                price
              </Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path="/:random3/chart">
              <Chart coinId={coinId} />
            </Route>
            <Route path="/:random4/price">
              {infoData && tickersData && (
                <Price info={infoData} price={tickersData} />
              )}
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
