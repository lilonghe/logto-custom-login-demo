'use client'
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

const Callback = () => {
  const auth = useAuth();

  useEffect(() => {
    console.log('auth.user changed:', auth.user, auth.isLoading);
    if (auth.user && !auth.isLoading) {
      window.location.replace("/");
    }
  }, [auth.user, auth.isLoading]);

  console.log(auth.error);

  return <div>
    <div>{auth.isAuthenticated ? 'Sign-in successful! Redirecting to home page...' : 'Handling sign-in callback...'}</div>
    <div>{auth.isLoading ? 'Yes' : 'No'}</div>
    {auth.error ? <div>Error: {auth.error.message}</div> : <div>No Error</div>}
  </div>;
};

export default Callback;
