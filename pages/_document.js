import Document, { Head, Main, NextScript } from 'next/document'

class NowDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="firebase integration" />
          <meta name="robots" content="noindex, nofollow" />
          <meta charSet="utf-8" />
        </Head>
        <body className="now-body bg-grey-lighter h-screen font-sans leading-normal tracking-normal">
          <Main />
          <NextScript />
        </body>
        <style global jsx>{`
          body {
            margin: 0;
          }
        `}
        </style>
      </html>
    )
  }
}

export default NowDocument