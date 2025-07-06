import { useForm } from "@tanstack/react-form";

import { Button, Input } from "@/components";
import { ISignupFormSchema, signupFormSchema } from "@/services/user/schemas";

type Props = {
  onSubmit: (data: ISignupFormSchema) => void;
  isLoading: boolean;
};

const SignUpForm = ({ onSubmit, isLoading }: Props) => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
    validators: {
      onChange: signupFormSchema,
      onBlur: signupFormSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
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

      <form.Field name="name">
        {field => (
          <Input
            label="Name"
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
            label="Password"
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
            label="Confirm Password"
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
              className="mx-auto w-1/2 laptop:text-xl tablet:text-lg text-base"
              loading={isSubmitting || isLoading}
              loadingPosition="end"
              sx={{ padding: "10px 0" }}
            >
              {isSubmitting ? "Signing in..." : "Sign Up"}
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  );
};

export default SignUpForm;
