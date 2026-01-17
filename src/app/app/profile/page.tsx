"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

import { Button, Input, Select } from "@/components/common";
import { useUserStore } from "@/hooks/stores";
import { useLocale } from "@/hooks/useLocale";
import { useUpdateUserProfile } from "@/services/user/query-hooks";
import { Option } from "@/types/general";
import { LanguageEnum } from "@/types/user";
import { addCookie, clearAuthTokens } from "@/utils/cookies";

const ProfilePage = () => {
  const router = useRouter();
  const user = useUserStore(state => {
    return state.user;
  });
  const currentLocale = useLocale();
  const tAuth = useTranslations("landing.auth");
  const tApp = useTranslations("app.profile");

  const { mutate: updateUserProfile, isPending: isUpdateUserProfilePending } =
    useUpdateUserProfile();

  const languageOptions: Option[] = [
    { value: LanguageEnum.EN, label: "English" },
    { value: LanguageEnum.UA, label: "Українська" },
  ];

  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      language: (currentLocale as LanguageEnum) || LanguageEnum.EN,
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: ({ value }) => {
      const isEmailChanged = value.email !== user?.email;

      const payload = {
        name: value.name,
        email: value.email,
        ...(value.newPassword.trim().length && {
          newPassword: value.newPassword,
        }),
      };

      try {
        updateUserProfile(payload, {
          onSuccess: () => {
            addCookie({ name: "NEXT_LOCALE", value: value.language });

            if (isEmailChanged) {
              toast.info(tAuth("confirmEmailInfo"));

              setTimeout(() => {
                clearAuthTokens();
                router.replace("/login");
              }, 3000);
            } else {
              toast.success(tApp("profileUpdated"));
            }
          },
          onError: error => {
            toast.error(error?.message);
          },
        });
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    },
  });

  const validatePasswordMatch = ({ value }: { value: string }) => {
    const formValues = form.state.values;
    if (formValues.newPassword && formValues.newPassword !== value) {
      return tApp("passwordsDoNotMatch");
    }
    return;
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-lg bg-[var(--background)] p-6 shadow-lg md:p-8">
        <h1 className="mb-6 font-bold text-2xl text-[var(--foreground)] md:text-3xl">
          {tApp("title")}
        </h1>

        <form
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <form.Field name="name">
              {field => (
                <Input
                  label={tApp("name")}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  required
                  error={field.state.meta.errors.length > 0}
                  helperText={field.state.meta.errors[0] || ""}
                />
              )}
            </form.Field>

            <form.Field name="email">
              {field => (
                <Input
                  label={tApp("email")}
                  type="email"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  required
                  error={field.state.meta.errors.length > 0}
                  helperText={field.state.meta.errors[0] || ""}
                />
              )}
            </form.Field>
          </div>

          <form.Field name="language">
            {field => (
              <Select
                label={tApp("language")}
                options={languageOptions}
                value={field.state.value}
                onChange={e =>
                  field.handleChange(e.target.value as LanguageEnum)
                }
                fullWidth
              />
            )}
          </form.Field>

          <div className="border-[var(--border)] border-t pt-6">
            <h2 className="mb-4 font-semibold text-[var(--foreground)] text-xl">
              {tApp("changePassword")}
            </h2>

            <div className="space-y-4">
              <form.Field name="newPassword">
                {field => (
                  <Input
                    label={tApp("newPassword")}
                    type="password"
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                  />
                )}
              </form.Field>

              <form.Field
                name="confirmPassword"
                validators={{
                  onChange: validatePasswordMatch,
                  onBlur: validatePasswordMatch,
                }}
              >
                {field => (
                  <Input
                    label={tApp("confirmNewPassword")}
                    type="password"
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    error={field.state.meta.errors.length > 0}
                    helperText={field.state.meta.errors[0]}
                  />
                )}
              </form.Field>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6 sm:flex-row">
            <form.Subscribe
              selector={state => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  variant="outlined"
                  disabled={
                    !canSubmit || isSubmitting || isUpdateUserProfilePending
                  }
                  loading={isSubmitting || isUpdateUserProfilePending}
                  loadingPosition="end"
                  className="w-full sm:w-auto"
                  sx={{ padding: "10px 24px" }}
                >
                  {tApp("saveChanges")}
                </Button>
              )}
            </form.Subscribe>

            <Button
              variant="text"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
              sx={{ padding: "10px 24px" }}
            >
              {tApp("cancel")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
