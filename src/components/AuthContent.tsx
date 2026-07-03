import login from "../assets/svg/login.svg";
import register from "../assets/svg/register.svg";


type ContentProp = {
  children: React.ReactNode;
  type: 'login' | 'register';
}

export function ContentAuth({ children, type }: ContentProp) {
  return (
    <main className={`w-screen h-screen flex ${type === 'login'? 'flex-row':'flex-row-reverse'} justify-between items-center`}>
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div className="w-full max-w-130 flex flex-col gap-10 bg-content rounded-2xl p-4 md:p-14">
          <div className="sm:h-auto overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-1/2">
        {type === 'login' && <img src={login} alt="login-stockmin" loading="eager"/>}
        {type === 'register' && <img src={register} alt="register-stockmin" loading="eager"/>}
      </div>
    </main>
  );
}