export async function getStory(itemId: number) {
  try {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
