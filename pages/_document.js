import Document, { Head, Main, NextScript } from 'next/document'

class NowDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html className="antialiased">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="firebase integration" />
          <meta name="robots" content="noindex, nofollow" />
          <meta charSet="utf-8" />
          <link href="https://fonts.googleapis.com/css?family=Karla" rel="stylesheet" />
        </Head>
        <body className="now-body bg-grey-lighter h-screen font-sans leading-normal tracking-normal">
          <Main />
          <NextScript />
        </body>
        <style global jsx>{`
          body {
            height: 100%;
            margin: 0;
            padding: 0;
          }
          * {
            box-sizing: border-box;
          }
        `}
        </style>
      </html>
    )
  }
}

export default NowDocument