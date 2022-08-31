import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard.css"
        />
        <meta name="title" content="YCC 포탈 - 연세대학교 중앙 컴퓨터동아리" />
        <meta
          name="description"
          content="연세대학교 중앙 컴퓨터동아리 YCC에서 운영하는 동아리 내 서비스 접속용 포탈 사이트입니다"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://portal.ycc.club" />
        <meta
          property="og:title"
          content="YCC 포탈 - 연세대학교 중앙 컴퓨터동아리"
        />
        <meta
          property="og:description"
          content="연세대학교 중앙 컴퓨터동아리 YCC에서 운영하는 동아리 내 서비스 접속용 포탈 사이트입니다"
        />
        <meta
          property="og:image"
          content="https://portal.ycc.club/Logo_white.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://portal.ycc.club" />
        <meta
          property="twitter:title"
          content="YCC 포탈 - 연세대학교 중앙 컴퓨터동아리"
        />
        <meta
          property="twitter:description"
          content="연세대학교 중앙 컴퓨터동아리 YCC에서 운영하는 동아리 내 서비스 접속용 포탈 사이트입니다"
        />
        <meta
          property="twitter:image"
          content="https://portal.ycc.club/Logo_white.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
