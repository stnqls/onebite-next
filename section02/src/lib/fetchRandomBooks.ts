import { url } from "@/constants/url";
import { BookData } from "@/types";

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const randomBookUrl = `${url}/book/random`;

  try {
    const response = await fetch(randomBookUrl);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}
