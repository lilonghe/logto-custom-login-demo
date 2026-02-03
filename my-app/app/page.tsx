'use client'
import { useLogto, type IdTokenClaims } from '@logto/react';
import { useEffect, useState } from 'react';

export default function Content() {
  const { signIn, signOut, isAuthenticated, getIdTokenClaims, getAccessTokenClaims } = useLogto();
  const [user, setUser] = useState<IdTokenClaims>();
  const [userScopes, setUserScopes] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const claims = await getIdTokenClaims();
        setUser(claims);

        const token = await getAccessTokenClaims('https://order.com');
        setUserScopes(token?.scope?.split(" ") ?? []);
      }
    })();
  }, [getIdTokenClaims, isAuthenticated]);

  return <div>
    {isAuthenticated ? (
      <button onClick={() => signOut('http://localhost:3000/')}>Sign Out</button>
    ) : (
      <button onClick={() => signIn('http://localhost:3000/callback')}>Sign In</button>
    )}

    {isAuthenticated && user && (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(user).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{typeof value === 'string' ? value : JSON.stringify(value)}</td>
            </tr>
          ))}
          {userScopes.map(item => <tr key={item}>
            <td>permission:</td>
            <td>{item}</td>
          </tr>)}
        </tbody>
      </table>
    )}

  </div>
}