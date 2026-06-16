import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-bold text-gray-900">칸반 보드</h1>
          <h2 className="mt-2 text-center text-xl text-gray-600">회원가입</h2>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
