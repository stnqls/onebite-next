"use server";

import { revalidatePath } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  const bookId = formData.get("bookId")?.toString();

  if (!content || !author) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ content, author, bookId }),
      }
    );
    console.log(response.status);
    // 해당 경로의 페이지를 재검증한다.(재생성)
    // 서버에서 book/{booId} 페이지를 다시 생성한다.
    // 데이터가 cache되어있어도 무시하고 재생성한다.
    revalidatePath(`/book/${bookId}`);
  } catch (err) {
    console.error(err);
    return;
  }
}
