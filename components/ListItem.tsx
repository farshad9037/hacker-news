import { useEffect, useState, useCallback, ReactNode } from "react";
import styled from "styled-components";
import { getStory } from "../pages/api/story";

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

const Item = styled.li`
  list-style: none;
  background-color: blue;
  padding: 8px;
  margin: 8px;
`;

const Title = styled.h2``;

const Author = styled.p``;

const Link = styled.button`
  color: palevioletred;
  font-size: 2em;
  padding: 8px;
  transform: rotate(90deg);
`;

const Arrow = styled.span`
  display: inline-block;
  transform: rotate(90deg);
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  return story && Object.keys(story).length ? (
    <Item>
      <Title>{story.title}</Title>
      <FlexContainer>
        <Author>{story.by}</Author>
        <Link as="a" href={story.url} target="_blank" rel="noopener">
          &#8689;
        </Link>
      </FlexContainer>
    </Item>
  ) : (
    <div>Loading...</div>
  );
}

export default ListItem;
