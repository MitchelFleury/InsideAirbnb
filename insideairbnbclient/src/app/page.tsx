'use client';
import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import MapPage from './mapPage';

function Page() { 
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string}
      authorizationParams={{
        audience: process.env.NEXT_PUBLIC_API_URL as string,
        redirect_uri: process.env.NEXT_PUBLIC_AUTH0_BASE_URL,
    }}
    >
      <MapPage />
    </Auth0Provider>
  );
}

export default Page;
