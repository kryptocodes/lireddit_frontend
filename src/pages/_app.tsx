import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { Provider,createClient, dedupExchange, fetchExchange  } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import theme from '../theme'
import { MeDocument } from '../generated/graphql';

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        login: (result, args, cache, info) => {
          cache.updateQuery({query: MeDocument}, data => {
          })
        },
      },
  }), fetchExchange],
});



function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
    </Provider>
  )
}

export default MyApp
