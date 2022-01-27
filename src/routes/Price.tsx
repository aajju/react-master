import styled from "styled-components";
import { InfoData, PriceData } from "../api";

const Rows = styled.div`
  padding: 10px 20px;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  width: 100%;
  height: 40px;
  margin-bottom: 5px;

  /* background-color: rebeccapurple; */
  place-content: center;
  align-items: center;
  gap: 10px;
  border: solid 1px ${(props) => props.theme.textColor};

  div:first-child {
    /* background-color: red; */
    text-align: end;
    text-transform: uppercase;
    font-weight: 500;
  }
`;

const Changes = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  margin-bottom: 40px;
`;

const Change = styled.div<{ isRed: Boolean }>`
  border: solid 2px ${(props) => (props.isRed ? "red" : "blue")};
  color: ${(props) => (props.isRed ? "red" : "blue")};
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 50px;

  div:last-child {
    font-weight: 800;
  }
`;

interface IPriceProps {
  info: InfoData;
  price: PriceData;
}

function Price({ info, price }: IPriceProps) {
  console.log(info, price);
  return (
    <Rows>
      <Changes>
        <Change isRed={price.quotes.USD.percent_change_15m > 0}>
          <div>15m</div>
          <div>{price.quotes.USD.percent_change_15m}%</div>
        </Change>
        <Change isRed={price.quotes.USD.percent_change_30m > 0}>
          <div>30m</div>
          <div>{price.quotes.USD.percent_change_30m}%</div>
        </Change>
        <Change isRed={price.quotes.USD.percent_change_1h > 0}>
          <div>1h</div>
          <div>{price.quotes.USD.percent_change_1h}%</div>
        </Change>
        <Change isRed={price.quotes.USD.percent_change_6h > 0}>
          <div>6h</div>
          <div>{price.quotes.USD.percent_change_6h}%</div>
        </Change>
        <Change isRed={price.quotes.USD.percent_change_12h > 0}>
          <div>12h</div>
          <div>{price.quotes.USD.percent_change_12h}%</div>
        </Change>
        <Change isRed={price.quotes.USD.percent_change_24h > 0}>
          <div>24h</div>
          <div>{price.quotes.USD.percent_change_24h}%</div>
        </Change>
        <Change isRed={price.quotes.USD.percent_change_7d > 0}>
          <div>7d</div>
          <div>{price.quotes.USD.percent_change_7d}%</div>
        </Change>
        <Change isRed={price.quotes.USD.percent_change_30d > 0}>
          <div>30d</div>
          <div>{price.quotes.USD.percent_change_30d}%</div>
        </Change>
      </Changes>
      <Row>
        <div>started at : </div>
        <div>{info.started_at}</div>
      </Row>
      <Row>
        <div>proof type : </div>
        <div>{info.proof_type}</div>
      </Row>
      <Row>
        <div>전고점 : </div>
        <div>{price.quotes.USD.ath_price}</div>
      </Row>
      <Row>
        <div>전고점 day : </div>
        <div>{price.quotes.USD.ath_date}</div>
      </Row>
      <Row>
        <div>전고점 대비 : </div>
        <div>{price.quotes.USD.percent_from_price_ath}%</div>
      </Row>
    </Rows>
  );
}

export default Price;
