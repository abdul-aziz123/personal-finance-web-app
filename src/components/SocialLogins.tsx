"use client";

import { signInWithGithub, signInWithGoogle } from "@/app/(dashboard)/actions";
import { Button } from "@/components/ui/button";
import { Github, Mail, type LucideIcon } from "lucide-react";
export default function SocialLogins() {
  return (
    <div className="flex gap-2">
      <SocialLoginButton
        icon={Mail}
        label="Google"
        onClick={() => signInWithGoogle()}
      />
      <SocialLoginButton
        icon={Github}
        label="GitHub"
        onClick={() => signInWithGithub()}
      />
    </div>
  );
}

interface SocialLoginButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

function SocialLoginButton({
  icon: Icon,
  label,
  onClick,
}: SocialLoginButtonProps) {
  return (
    <Button
      variant="secondary"
      className="flex w-full items-center justify-center gap-2"
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span>Sign in with {label}</span>
    </Button>
  );
}
