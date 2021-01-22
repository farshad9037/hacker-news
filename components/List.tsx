import { Fragment, forwardRef, ReactNode } from "react";
import styled from "styled-components";
import ListItem from "./ListItem";

const ScrollableUl = styled.ul`
  width: 100%;
  overflow: auto;
  padding: 0;
  margin: 0;
`;

type Props = {
  items: Array<number>;
  onFetchItem: (itemId: number) => void;
};

export type Ref = HTMLUListElement;

const List = forwardRef<Ref, Props>(({ items, onFetchItem }, ref) => {
  return items && items.length ? (
    <ScrollableUl ref={ref}>
      {items.map((itemdId: number) => {
        return (
          <Fragment key={itemdId}>
            <ListItem itemId={itemdId} onFetchItem={onFetchItem}/>
          </Fragment>
        )
      })}
    </ScrollableUl>
  ) : (
    <li>{"List Loading..."}</li>
  );
});

export default List;
