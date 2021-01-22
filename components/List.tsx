import { Fragment, forwardRef, ReactNode, useRef } from "react";
import styled from "styled-components";
import ListItem from "./ListItem";
import { useInfiniteScroll } from "../customHooks/useInfiniteScroll";

const ScrollableUl = styled.ul`
  width: 100%;
  overflow: auto;
  padding: 0;
  margin: 0;
`;

const Boundary = styled.div`
  border: 1px solid;
  visibility: hidden;
`;

type Props = {
  items: Array<number>;
  onFetchItem: (itemId: number) => void;
  onScroll: () => void;
};

export type Ref = HTMLUListElement;

const List = forwardRef<Ref, Props>(({ items, onFetchItem, onScroll }, ref) => {
  const bottomBoundaryRef = useRef(null);

  useInfiniteScroll(bottomBoundaryRef, onScroll);

  return items && items.length ? (
    <ScrollableUl ref={ref}>
      {items.map((itemdId: number) => (
        <Fragment key={itemdId}>
          <ListItem itemId={itemdId} onFetchItem={onFetchItem} />
        </Fragment>
      ))}
      <Boundary ref={bottomBoundaryRef}></Boundary>
    </ScrollableUl>
  ) : (
    <li>{"List Loading..."}</li>
  );
});

export default List;
