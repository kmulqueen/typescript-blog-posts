import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { BlogPost } from "./components/BlogPosts";
import { get } from "./util/http";
import fetchingImg from "./assets/data-fetching.png";
import BlogPosts from "./components/BlogPosts";
import ErrorMessage from "./components/ErrorMessage";

type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string>("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const posts = await get<RawDataBlogPost[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );

        const blogPosts: BlogPost[] = posts.map((rawPost) => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body,
          };
        });
        setFetchedPosts(blogPosts);
        setIsError("");
      } catch (error) {
        if (error instanceof Error) {
          setIsError(error.message);
        } else {
          setIsError("Failed to fetch posts.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  let content: ReactNode;

  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }
  if (isError) {
    content = <ErrorMessage text={isError} />;
  }
  if (isLoading) {
    content = <p id="loading-fallback">Loading...</p>;
  }

  return (
    <main>
      <img
        src={fetchingImg}
        alt="Abstract image depicting data fetching process."
      />
      {content}
    </main>
  );
}

export default App;
