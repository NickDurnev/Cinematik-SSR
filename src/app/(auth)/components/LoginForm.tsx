import { useForm } from "@tanstack/react-form";

import { Button, Input } from "@/components";
import { ILoginFormSchema, loginFormSchema } from "@/services/user/schemas";

type Props = {
    onSubmit: (data: ILoginFormSchema) => Promise<void>;
    isLoading: boolean;
};

const LoginForm = ({ onSubmit, isLoading }: Props) => {
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validators: {
            onChange: loginFormSchema,
            onBlur: loginFormSchema,
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
                {field => {
                    console.log(" field:", field.state);

                    return (
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
                    );
                }}
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
            <form.Subscribe
                selector={state => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <div className="flex w-full items-center justify-center">
                        <Button
                            type="submit"
                            variant="outlined"
                            disabled={!canSubmit || isSubmitting || isLoading}
                            className="mx-auto w-1/2 laptop:text-xl tablet:text-lg text-base"
                            sx={{ padding: "10px 0" }}
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button>
                    </div>
                )}
            />
        </form>
    );
};

export default LoginForm;
