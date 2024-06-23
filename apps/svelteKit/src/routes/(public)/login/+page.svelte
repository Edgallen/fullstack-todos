<script lang="ts">
    import AuthForm from "$components/AuthForm/AuthForm.svelte";
    import InputField from "$components/InputField/InputField.svelte";

    import type {IAuthFormState} from "$interfaces/auth";

    export let form: IAuthFormState | null;
</script>

<div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <AuthForm
        title='Sign in to your account'
        buttonTitle='Sign in'
        action="?/logIn"
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
            autocomplete="current-password"
            value={form?.password}
            error={form?.errors?.password?.[0]}
            required={true}
        />
    </AuthForm>

    <div class="flex flex-col gap-6 items-center">
        <p class="mt-10 text-center text-sm text-gray-500">
            Don`t have account yet?{' '}

            <a
                class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                href="/register"
            >
                Create
            </a>
        </p>

        <form>
            <button
                class="bg-indigo-600 text-white px-3 py-1.5 text-sm font-semibold rounded-md"
                formmethod="POST"
                formaction="?/testLogIn"
            >
                Sign in as test user
            </button>
        </form>
    </div>
</div>
