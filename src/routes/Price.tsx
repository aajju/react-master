import { useRecoilValue } from "recoil";
import { InfoData, PriceData } from "../api";
import { selectedCoin } from "../atoms";

interface IPriceProps {
  abc: InfoData;
  aaa: PriceData;
}

function Price() {
  // console.log(abc, aaa);
  return <h1>hello</h1>;
}

export default Price;
