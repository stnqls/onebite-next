import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetchOneBook";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id as string;

  const book = await fetchOneBook(id);

  return {
    props: { book },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [
      // params의 값은 문자열로 설정해주어야한다.
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true, // 미리 paths로 설정하지 않는 페이지는 404를 보여준다.
    // false : 404 Not found
    // blocking : SSR 방식
    // true : SSR 방식 + 데이터가 없는 풀백 상태의 페이지부터 반환
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return "로딩중입니다.";
  if (!book) return "문제가 발생했습니다 다시 시도하세요";
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
