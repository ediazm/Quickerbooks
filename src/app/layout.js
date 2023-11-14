import './globals.css'
import { Inter } from 'next/font/google'
import { ApolloWrapper } from './apollo-provider'
import { ApolloClient, InMemoryCache } from '@apollo/client';
const inter = Inter({ subsets: ['latin'] })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql"
});

export const metadata = {
  title: 'QuickerBooks',
  description: 'This app will conect Apollo-Client with Apollo-Server',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ApolloWrapper>
        {children}
      </ApolloWrapper>
      </body>
    </html>
  )
}
