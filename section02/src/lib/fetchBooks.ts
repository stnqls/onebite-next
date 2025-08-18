import { url } from "@/constants/url";
import { BookData } from "@/types";

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let bookUrl = `${url}/book`;

  if (q) {
    bookUrl += `/search?q=${q}`;
  }

  try {
    const response = await fetch(bookUrl);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}
