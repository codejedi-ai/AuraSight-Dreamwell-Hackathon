import { Amplify } from 'aws-amplify';
import { generateClient } from '@aws-amplify/api';
import type { Schema } from './amplify/data/resource';

// Configure Amplify with the deployed sandbox resources
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_snDsTRJao',
      userPoolClientId: 'mlmdtd1m0oft5tfu9onc2cgug',
      identityPoolId: 'us-east-1:5c7aee37-ba06-4240-ae73-50536f25153a',
      signUpVerificationMethod: 'code',
      loginWith: {
        email: true,
      },
    },
  },
  API: {
    GraphQL: {
      endpoint: 'https://tjp54xmqyzep3kzphk7rxxx7p4.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      defaultAuthMode: 'userPool',
    },
  },
}, {
  ssr: true,
});

// Configure the API client with the correct schema
export const client = generateClient<Schema>(); 