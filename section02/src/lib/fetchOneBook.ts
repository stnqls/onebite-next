import { url } from "@/constants/url";
import { BookData } from "@/types";

export default async function fetchOneBook(
  id: string
): Promise<BookData | null> {
  const bookUrl = `${url}/book/${id}`;

  try {
    const response = await fetch(bookUrl);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
