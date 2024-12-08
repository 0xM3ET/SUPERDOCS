const MessageBoxWithGradient = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="relative w-full">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-75 blur-lg" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500 via-transparent to-transparent opacity-50" />
        <div className="relative">{children}</div>
      </div>
    );
  };
  