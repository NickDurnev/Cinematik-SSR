"use client";

import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { Button, Input } from "@/components/common";
import { useFormsDataStore } from "@/hooks/stores";
import { ISignupFormSchema, signupFormSchema } from "@/services/user/schemas";
import { deepEqual } from "@/utils/general";

type Props = {
  onSubmit: (data: ISignupFormSchema) => void;
  isLoading: boolean;
};

export const SignUpForm = ({ onSubmit, isLoading }: Props) => {
  const { data, setData } = useFormsDataStore();
  const t = useTranslations("landing.auth");

  const form = useForm({
    defaultValues: data,
    validators: {
      onChange: signupFormSchema,
      onBlur: signupFormSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  type SignUpValues = {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
  };

  const SyncSignUpValues = ({ values }: { values: SignUpValues }) => {
    useEffect(() => {
      const isEqual = deepEqual(data, values);
      const isAllEmpty = Object.values(values).every(val => val === "");
      if (!isEqual && !isAllEmpty) {
        setData(values);
      }
    }, [values]);
    return null;
  };

  return (
    <>
      <form.Subscribe selector={state => state.values}>
        {values => <SyncSignUpValues values={values} />}
      </form.Subscribe>
      <form
        onSubmit={e => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-3"
      >
        <form.Field name="email">
          {field => (
            <Input
              label={t("email")}
              type="email"
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

        <form.Field name="name">
          {field => (
            <Input
              label={t("name")}
              type="name"
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
        <form.Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
        >
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
                {isSubmitting ? t("signingIn") : t("signUp")}
              </Button>
            </div>
          )}
        </form.Subscribe>
      </form>
    </>
  );
};
