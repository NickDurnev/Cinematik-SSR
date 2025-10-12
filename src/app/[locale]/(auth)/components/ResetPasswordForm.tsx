"use client";

import { useForm } from "@tanstack/react-form";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button, Input } from "@/components/common";
import { resetPasswordFormSchema } from "@/services/user/schemas";
import { IResetPasswordDto } from "@/types/user";

type Props = {
  onSubmit: (data: IResetPasswordDto) => void;
  isLoading: boolean;
};

export const ResetPasswordForm = ({ onSubmit, isLoading }: Props) => {
  const searchParams = useSearchParams();

  const resetToken = searchParams.get("token");
  const t = useTranslations("landing.auth");

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: resetPasswordFormSchema,
      onBlur: resetPasswordFormSchema,
    },
    onSubmit: ({ value }) => {
      const payload = {
        newPassword: value.password,
        token: resetToken || "",
      };
      onSubmit(payload);
    },
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-3"
    >
      <form.Field name="password">
        {field => (
          <Input
            label={t("password")}
            type="password"
            value={field.state.value}
            onChange={e => {
              field.handleChange(e.target.value);
            }}
            required
            error={field.state?.meta?.errors?.length > 0}
            helperText={field.state?.meta?.errors[0]?.message}
          />
        )}
      </form.Field>

      <form.Field name="confirmPassword">
        {field => (
          <Input
            label={t("confirmPassword")}
            type="confirmPassword"
            value={field.state.value}
            onChange={e => {
              field.handleChange(e.target.value);
            }}
            required
            error={field.state?.meta?.errors?.length > 0}
            helperText={field.state?.meta?.errors[0]?.message}
          />
        )}
      </form.Field>

      <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <div className="flex w-full items-center justify-center">
            <Button
              type="submit"
              variant="outlined"
              disabled={!canSubmit || isSubmitting || isLoading}
              className="laptop:!text-xl tablet:!text-lg mx-auto w-[40%]"
              loading={isSubmitting || isLoading}
              loadingPosition="end"
              sx={{ padding: "10px 10px" }}
            >
              {isSubmitting || isLoading ? t("resetting") : t("reset")}
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  );
};
