import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Configuration } from './config.keys';
import { ConfigService } from './config.service';

const config: ConfigService = new ConfigService();

export const GraphQL = GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    typePaths: ['./**/graphql/*.graphql'],
    installSubscriptionHandlers: true,
    playground: Boolean(JSON.parse(config.get(Configuration.GRAPHQL_DEGUB))),
    debug: Boolean(JSON.parse(config.get(Configuration.GRAPHQL_DEGUB))),

    context: ({ req, connection }) => (connection ? { headers: connection.context } : { headers: req.headers }),
    formatError: (error) => new Error(error.message),
});
