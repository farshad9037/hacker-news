import {
  useState,
  useEffect,
  useRef,
  useCallback,
  createRef,
  Fragment
} from "react";
import Head from "next/head";
import { Main, PageTitle } from "../components";
import { getStories } from "./api/stories";
import { GetStaticProps } from "next";
import List, { Ref } from "../components/List";
import debounce from "lodash.debounce";
import { getStory } from "./api/story";

type Props = {
  stories: Array<number>;
};

function Home({ stories }: Props) {
  const scrollRef = createRef<Ref>();
  const limit = useRef(10);

  const [currItems, setCurrItems] = useState(stories.slice(0, limit.current));

  const handleScroll = useCallback(
    debounce(() => {
      limit.current += 5;
      const newItems = [...stories].slice(0, limit.current);
      setCurrItems(newItems);
    }, 200),
    [stories]
  );

  useEffect(() => {
    scrollRef.current.addEventListener("scroll", handleScroll);
    return () => {
      scrollRef.current &&
        scrollRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>HackerNews</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <PageTitle>HackerNews List</PageTitle>
        <List ref={scrollRef} items={currItems} onFetchItem={getStory} />
      </Main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const stories = await getStories();
  return { props: { stories } };
};

export default Home;
