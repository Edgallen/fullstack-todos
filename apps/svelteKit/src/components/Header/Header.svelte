<script lang="ts">
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';

    import {Menubar, MenubarContent, MenubarItem, MenubarTrigger} from "$components/MenuBar";
    import Icon from "$components/Icon/Icon.svelte";

    const userData = $page.data.userData
</script>

<header class="flex h-20 w-full items-center justify-end px-8">
    <Menubar>
        <MenubarTrigger
            class="flex text-white size-12 items-center justify-center text-xl font-medium bg-indigo-600 rounded-full hover:bg-indigo-600"
        >
            {userData.username[0].toUpperCase()}
        </MenubarTrigger>

        <MenubarContent class="top-14">
            <form
                method="POST"
                action="?/logOut"
                use:enhance
            >
                <MenubarItem
                    class="text-red-500"
                >
                    <Icon
                        type='logOut'
                        height={16}
                        width={16}
                    />

                    <span>Log out</span>
                </MenubarItem>
            </form>
        </MenubarContent>
    </Menubar>
</header>
