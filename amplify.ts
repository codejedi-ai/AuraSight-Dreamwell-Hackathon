import { Amplify } from 'aws-amplify';
import { generateClient } from '@aws-amplify/api';
import type { Schema } from './amplify/data/resource';

// Configure Amplify with the deployed sandbox resources
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_dELxg3zLc',
      userPoolClientId: '4mu9955gchebq3etpvu504b5q6',
      identityPoolId: 'us-east-2:add80c06-1d98-4306-9647-e2fa7c97c12c',
      signUpVerificationMethod: 'code',
      loginWith: {
        email: true,
      },
    },
  },
  API: {
    GraphQL: {
      endpoint: 'https://e7tr74u2gffl7fkntmuzat6f6a.appsync-api.us-east-2.amazonaws.com/graphql',
      region: 'us-east-2',
      defaultAuthMode: 'userPool',
    },
  },
}, {
  ssr: true,
});

// Configure the API client with the correct schema
export const client = generateClient<Schema>(); 