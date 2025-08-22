"use server";

import { revalidateTag } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createReviewAction(_: any, formData: FormData) {
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  const bookId = formData.get("bookId")?.toString();

  if (!content || !author || !bookId) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ content, author, bookId }),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // 해당 경로의 페이지를 재검증한다.(재생성)
    // 서버에서 book/{booId} 페이지를 다시 생성한다.
    // 데이터가 cache되어있어도 무시하고 재생성한다.
    // revalidatePath(`/book/${bookId}`);
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      error: "리뷰 저장에 실패했습니다.",
    };
  }
}
