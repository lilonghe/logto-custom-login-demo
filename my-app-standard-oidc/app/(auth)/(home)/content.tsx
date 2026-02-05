import { useAuth } from "react-oidc-context";

const Home = () => {
  const auth = useAuth();
  const user = auth.user?.profile;

  console.log('User:', auth.user);

  return <div className="p-2">
    {auth.isAuthenticated ? (
        <button onClick={() => auth.signoutRedirect()}>Sign Out</button>
    ) : (
        <button onClick={() => auth.signinRedirect()}>Sign In</button>
    )}

    {auth.isAuthenticated && user && (
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
        </tbody>
      </table>
    )}
  </div>
};

export default Home;
