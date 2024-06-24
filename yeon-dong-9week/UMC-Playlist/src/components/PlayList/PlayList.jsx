import { Container, TitleText, PlayListContainer, Divider, TotalContainer, TotalsText, Totals, Reset } from "./PlayList.style";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals, clearCart } from "../../redux/cartSlice";
import { useEffect } from "react";
import PlayListItem from "../PlayListItem/PlayListItem";

function PlayList() {
    const { items, totalAmount } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateTotals());
    }, [items]);

    const onReset = () => {
        dispatch(clearCart());
    };
  
    return (
      <>
        <Container>
            <TitleText>당신이 선택한 음반</TitleText>
            <PlayListContainer>
            {items.map((item) => (
                <PlayListItem key={item.key} item={item} />
            ))}
            </PlayListContainer>
            <Divider />
            <TotalContainer>
            <TotalsText>총 가격</TotalsText>
            <Totals>{totalAmount}원</Totals>
            </TotalContainer>
            <Reset onClick={onReset}>장바구니 초기화하기</Reset>
        </Container>
      </>
    )
  }
    
    export default PlayList