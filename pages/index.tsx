import { useState, useRef, useCallback, createRef } from "react";
import Head from "next/head";
import { Main, PageTitle } from "../components";
import { getStories } from "./api/stories";
import { GetStaticProps } from "next";
import List from "../components/List";
import debounce from "lodash.debounce";
import { getStory } from "./api/story";

type Props = {
  stories: Array<number>;
};

function Home({ stories }: Props) {
  const limit = useRef(10);

  const [currItems, setCurrItems] = useState(stories.slice(0, limit.current));

  const handleScroll = useCallback(
    debounce(() => {
      limit.current += 10;
      const newItems = [...stories].slice(0, limit.current);
      setCurrItems(newItems);
    }, 200),
    [stories]
  );

  return (
    <div>
      <Head>
        <title>HackerNews</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <PageTitle>HackerNews List</PageTitle>
        <List
          items={currItems}
          onFetchItem={getStory}
          onScroll={handleScroll}
        />
      </Main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const stories = await getStories();
  return { props: { stories } };
};

export default Home;
