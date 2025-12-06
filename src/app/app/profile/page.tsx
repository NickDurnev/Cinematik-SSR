"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button, Input, Select } from "@/components/common";
import { useUserStore } from "@/hooks/stores";
import { useLocale } from "@/hooks/useLocale";
import { Option } from "@/types/general";

const ProfilePage = () => {
  const router = useRouter();
  const user = useUserStore(state => state.user);
  const currentLocale = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  const languageOptions: Option[] = [
    { value: "en", label: "English" },
    { value: "uk", label: "Українська" },
  ];

  const form = useForm({
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
      newPassword: "",
      confirmPassword: "",
      language: currentLocale || "en",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      try {
        console.log("Updating profile with data:", value);
        // TODO: Add API call to update user profile
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        console.log("Profile updated successfully");
      } catch (error) {
        console.error("Failed to update profile:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const validatePasswordMatch = ({ value }: { value: string }) => {
    const formValues = form.state.values;
    if (formValues.newPassword && formValues.newPassword !== value) {
      return "Passwords do not match";
    }
    return;
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-lg bg-[var(--background)] p-6 shadow-lg md:p-8">
        <h1 className="mb-6 font-bold text-2xl text-[var(--foreground)] md:text-3xl">
          Profile Settings
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
                  label="Name"
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
                  label="Email"
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
                label="Language"
                options={languageOptions}
                value={field.state.value}
                onChange={e => field.handleChange(String(e.target.value))}
                fullWidth
              />
            )}
          </form.Field>

          <div className="border-[var(--border)] border-t pt-6">
            <h2 className="mb-4 font-semibold text-[var(--foreground)] text-xl">
              Change Password
            </h2>

            <div className="space-y-4">
              <form.Field name="newPassword">
                {field => (
                  <Input
                    label="New Password"
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
                    label="Confirm New Password"
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
                  disabled={!canSubmit || isSubmitting || isLoading}
                  loading={isSubmitting || isLoading}
                  loadingPosition="end"
                  className="w-full sm:w-auto"
                  sx={{ padding: "10px 24px" }}
                >
                  Save Changes
                </Button>
              )}
            </form.Subscribe>

            <Button
              variant="text"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
              sx={{ padding: "10px 24px" }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
