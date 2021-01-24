export default async function getStories() {
  try {
    const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
