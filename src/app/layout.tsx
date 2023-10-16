
import type { Metadata } from 'next'
import Head from 'next/head';
import { Inter } from 'next/font/google'
import Header from '@/components/Header';

import 'bootstrap/dist/css/bootstrap.min.css';

// import scss
import '@/styles/css/index.scss';

// import css
import '@/styles/index.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  charset: 'UTF-8'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        {/* <!-- Bootstrap CSS--> */}
        {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossOrigin="anonymous"></link> */}
        <link href="https://kendo.cdn.telerik.com/themes/6.4.0/default/default-main.css" rel="stylesheet" />
        {/* <!-- Mobile Select --> */}
      </head >
      <body className={inter.className}>
        <div className="container">
          <Header />
          {children}
        </div>
        {/* <!-- jQuery --> */}
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
        {/* <!-- Popper  --> */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.9.2/umd/popper.min.js" integrity="sha512-2rNj2KJ+D8s1ceNasTIex6z4HWyOnEYLVC3FigGOmyQCZc2eBXKgOxQmo3oKLHyfcj53uz4QMsRCWNbLd32Q1g==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
        {/* <!-- Bootstrap JS--> */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8" crossOrigin="anonymous"></script>
        {/* <!-- Litepicker --> */}
        <script src="https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js"></script>
      </body>
    </html >
  )
}

