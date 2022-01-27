import { useRecoilValue } from "recoil";
import { InfoData, PriceData } from "../api";
import { selectedCoin } from "../atoms";

interface IPriceProps {
  aaa: InfoData;
  bbb: PriceData;
}

function Price({ aaa, bbb }: IPriceProps) {
  console.log(aaa, bbb);
  return <h1>hello</h1>;
}

export default Price;
