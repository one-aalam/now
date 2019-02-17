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
          <meta charSet="utf-8" />
          {/* <link rel="stylesheet" href="/static/style.css" /> */}
          <style>{`body { margin: 0 } /* custom! */`}</style>
        </Head>
        <body className="now-body">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default NowDocument