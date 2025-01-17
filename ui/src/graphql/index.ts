import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client'

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql'
})

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token')

    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : undefined
        }
    })

    return forward(operation)
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export const apolloClient = client
