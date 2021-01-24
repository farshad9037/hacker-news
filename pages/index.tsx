import { useState, useRef, useCallback, Fragment } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import styled from "styled-components";

import { Main, PageTitle, ListItem } from "../components";
import { getStories, getStory } from "./api";
import { useInfiniteScroll } from "../customHooks/useInfiniteScroll";

type Props = {
  stories: Array<number>;
};

const Boundary = styled.div`
  border: 1px solid;
  visibility: hidden;
`;

function Home({ stories }: Props) {
  const limit = useRef(10);
  const boundaryRef = useRef<HTMLDivElement>(null);
  const [currItems, setCurrItems] = useState(stories.slice(0, limit.current));

  const handleScroll = useCallback(() => {
    limit.current += 1;
    setCurrItems([...stories].slice(0, limit.current));
  }, [stories]);

  useInfiniteScroll(boundaryRef, handleScroll);

  return (
    <div>
      <Head>
        <title>HackerNews</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTitle>HackerNews</PageTitle>
      <Main>
        {currItems &&
          currItems.length &&
          currItems.map((itemdId: number) => (
            <Fragment key={itemdId}>
              <ListItem itemId={itemdId} onFetchItem={getStory} />
            </Fragment>
          ))}
          <Boundary ref={boundaryRef}></Boundary>
      </Main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const stories = await getStories();
  return { props: { stories } };
};

export default Home;
