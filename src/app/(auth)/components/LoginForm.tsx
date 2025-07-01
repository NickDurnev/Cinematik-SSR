import { TextField } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { ILoginFormSchema, loginFormSchema } from "@/services/user/schemas";
import { Button } from "@/components";

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
            onBlur: loginFormSchema
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
                        <TextField
                            label="Email"
                            type="email"
                            value={field.state.value}
                            onChange={e => {
                                field.handleChange(e.target.value);
                            }}
                            fullWidth
                            required
                            margin="normal"
                            InputLabelProps={{ style: { color: "var(--foreground)" } }}
                            InputProps={{
                                style: {
                                    color: "var(--foreground)",
                                    background: "var(--card)",
                                    borderRadius: 10,
                                    fontSize: 16,
                                },
                            }}
                            error={field.state?.meta?.errors?.length > 0}
                            helperText={field.state?.meta?.errors[0]?.message}
                        />
                    );
                }}
            </form.Field>

            <form.Field name="password">
                {field => (
                    <TextField
                        label="Password"
                        type="password"
                        value={field.state.value}
                        onChange={e => {
                            field.handleChange(e.target.value);
                        }}
                        fullWidth
                        required
                        margin="normal"
                        InputLabelProps={{ style: { color: "var(--foreground)" } }}
                        InputProps={{
                            style: {
                                color: "var(--foreground)",
                                background: "transparent",
                                borderRadius: 10,
                                fontSize: 16,
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "var(--foreground)",
                                },
                                "&:hover fieldset": {
                                    borderColor: "var(--primary)",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "var(--primary)",
                                },
                            },
                        }}
                        error={field.state?.meta?.errors?.length > 0}
                        helperText={field.state?.meta?.errors[0]?.message}
                    />
                )}
            </form.Field>
            <form.Subscribe
                selector={state => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <div className="w-full flex justify-center items-center">
                        <Button
                            type="submit"
                            variant="outlined"
                            disabled={!canSubmit || isSubmitting || isLoading}
                            className="laptop:text-xl tablet:text-lg text-base w-1/2 mx-auto"
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

