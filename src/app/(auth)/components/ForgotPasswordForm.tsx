"use client";

import { useForm } from "@tanstack/react-form";

import { Button, Input } from "@/components";
import { useFormsDataStore } from "@/hooks/stores";
import {
  forgotPasswordFormSchema,
  IForgotPasswordFormSchema,
} from "@/services/user/schemas";
import { deepEqual } from "@/utils/general";

type Props = {
  onSubmit: (data: IForgotPasswordFormSchema) => void;
  isLoading: boolean;
};

const ForgotPasswordForm = ({ onSubmit, isLoading }: Props) => {
  const { data, setData } = useFormsDataStore();
  const form = useForm({
    defaultValues: {
      email: data.email,
    },
    validators: {
      onChange: forgotPasswordFormSchema,
      onBlur: forgotPasswordFormSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <>
      <form.Subscribe selector={state => state.values}>
        {values => {
          const formData = {
            name: data.name,
            password: data.password,
            confirmPassword: data.confirmPassword,
            ...values,
          };
          const isEqual = deepEqual(data, formData);
          const isAllEmpty = Object.values(formData).every(val => val === "");
          if (!isEqual && !isAllEmpty) {
            setData({ ...data, ...values });
            return null;
          }
        }}
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
              label="Email"
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
                {isSubmitting || isLoading ? "Sending..." : "Send email"}
              </Button>
            </div>
          )}
        </form.Subscribe>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
