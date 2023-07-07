import { Nunito } from 'next/font/google'
import {Adsense} from '@ctrl/react-adsense';

import './globals.css'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modal/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modal/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modal/RentModal'
import SearchModal from './components/modal/SearchModal'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font  = Nunito({
  subsets: ["latin"]
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5846422129610322"
     crossOrigin="anonymous"></script>
      </head>
      <Adsense
        client="ca-pub-5846422129610322"
        slot="3402552484"
        style={{ display: 'block' }}
        layout="+29+q3+r+21+4v"
        format="fluid"
      />
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
