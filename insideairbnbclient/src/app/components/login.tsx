interface LoginProps {
  loading: boolean;
}

function Login({ loading }: LoginProps) {
  const loginText = 'You need to be logged in to view this page';
  const loadingText = 'Loading...';
  return (
    <div className="flex items-center justify-center h-full">
      <div className="font-bold text-gray-500">
        {loading ? loadingText : loginText}
      </div>
    </div>
  );
}

export default Login;
