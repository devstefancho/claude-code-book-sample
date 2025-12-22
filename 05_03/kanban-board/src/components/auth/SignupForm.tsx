"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = (): string | null => {
    if (password.length < 8) {
      return "비밀번호는 최소 8자 이상이어야 합니다.";
    }
    if (password !== confirmPassword) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        if (authError.message.includes("already registered")) {
          setError("이미 등록된 이메일입니다.");
        } else {
          setError(authError.message);
        }
        return;
      }

      // Since email confirmation may not be required, try to sign in immediately
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // If sign in fails, email confirmation is likely required
        setSuccess(true);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mt-8 space-y-6">
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          <h3 className="font-medium">가입 완료!</h3>
          <p className="mt-1 text-sm">
            이메일 인증 링크를 확인해주세요. 인증 후 로그인할 수 있습니다.
          </p>
        </div>
        <Link href="/login">
          <Button variant="secondary" className="w-full">
            로그인 페이지로 이동
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="example@email.com"
        />

        <Input
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          placeholder="최소 8자 이상"
          error={
            password.length > 0 && password.length < 8 ? "최소 8자 이상 입력하세요" : undefined
          }
        />

        <Input
          label="비밀번호 확인"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
          placeholder="비밀번호를 다시 입력하세요"
          error={
            confirmPassword.length > 0 && password !== confirmPassword
              ? "비밀번호가 일치하지 않습니다"
              : undefined
          }
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "가입 중..." : "회원가입"}
      </Button>

      <p className="text-center text-sm text-gray-600">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          로그인
        </Link>
      </p>
    </form>
  );
}
