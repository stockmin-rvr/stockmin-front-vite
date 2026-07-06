export function LoadingScreen() {

  return (
    <div className="w-screen h-screen inset-0 z-9999 flex items-center justify-center bg-content">
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-40 h-40 bg-primary-300 opacity-30 rounded-full blur-2xl animate-pulse" />
          <img
            src="/logos/logo-vertical.png"
            alt="logo"
            className="relative w-80 h-80 object-contain"
          />
        </div>
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary-200 rounded-full" />
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-primary-300 rounded-full animate-spin" />
        </div>
        <p className="text-muted-foreground animate-pulse">
          Cargando...
        </p>
      </div>
    </div>
  );
}