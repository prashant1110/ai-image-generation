import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const AppBar = () => {
  return (
    <header className="flex justify-end items-center gap-4 ">
      <SignedOut>
        <SignInButton>
          <span className="cursor-pointer border-1 p-2  rounded-md">
            Sign In
          </span>
        </SignInButton>
        <SignUpButton>
          <span className="cursor-pointer border-1 p-2  rounded-md">
            Sign Up
          </span>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default AppBar;
