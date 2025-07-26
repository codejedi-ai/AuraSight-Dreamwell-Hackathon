import { Amplify } from 'aws-amplify';
import { generateClient } from '@aws-amplify/api';
import type { Schema } from './amplify/data/resource';

// Configure Amplify with the deployed sandbox resources
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_aurasight',
      userPoolClientId: 'aurasight-client',
      identityPoolId: 'us-east-2:aurasight-identity-pool',
      signUpVerificationMethod: 'code',
      loginWith: {
        email: true,
      },
    },
  },
  API: {
    GraphQL: {
      endpoint: 'https://aurasight-graphql-endpoint.amazonaws.com/graphql',
      region: 'us-east-2',
      defaultAuthMode: 'userPool',
    },
  },
}, {
  ssr: true,
});

// Configure the API client with the correct schema
export const client = generateClient<Schema>(); 