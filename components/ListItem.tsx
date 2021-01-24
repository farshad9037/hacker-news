import { useEffect, useState, useCallback, ReactNode } from "react";
import styled from "styled-components";
import { Link, FlexWrapper, ListItemSkeleton } from "./index";

export type Item = {
  by: string;
  descendants: number;
  id: number;
  kids: Array<Number>;
  score: number;
  time: number;
  title: ReactNode;
  type: string;
  url: string;
};

type Props = {
  itemId: number;
  onFetchItem: (itemId: number) => void;
};

const Item = styled.article`
  padding: 16px;
  margin: 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Author = styled.p`
  margin: 0;
`;

function ListItem({ itemId, onFetchItem }: Props) {
  const [story, setStory] = useState(null);

  const fetchStory = useCallback(async () => {
    try {
      const res = await onFetchItem(itemId);
      setStory(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchStory();
  }, [fetchStory]);

  return (
    <Item>
      {story && Object.keys(story).length ? (
        <>
          <Title>{story.title}</Title>
          <FlexWrapper>
            <Author>{story.by}</Author>
            <Link as="a" href={story.url} target="_blank" rel="noopener">
              &#8689;
            </Link>
          </FlexWrapper>
        </>
      ) : (
        <ListItemSkeleton />
      )}
    </Item>
  );
}

export default ListItem;
