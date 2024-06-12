<script lang="ts">
    import AuthForm from "$components/AuthForm/AuthForm.svelte";
    import InputField from "$components/InputField/InputField.svelte";
    import type {IAuthFormState, IRegisterAuthErrors} from "$interfaces/auth";

    export let form: IAuthFormState<IRegisterAuthErrors> | null;
</script>

<div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <AuthForm
        title='Create Account'
        buttonTitle='Create account'
        action="?/register"
    >
        <InputField
            title="username"
            label="Username"
            autocomplete="username"
            value={form?.username}
            error={form?.errors?.username?.[0]}
            required={true}
        />

        <InputField
            title="password"
            label="Password"
            inputType="password"
            value={form?.password}
            error={form?.errors?.password?.[0]}
            required={true}
        />

        <InputField
            title="confirm"
            label="Confirm Password"
            inputType="password"
            value={form?.confirm}
            error={form?.errors?.confirm?.[0]}
            required={true}
        />
    </AuthForm>

    <p class="mt-10 text-center text-sm text-gray-500">
        Already have account?{' '}

        <a
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            href="/login"
        >
            Sign in
        </a>
    </p>
</div>
