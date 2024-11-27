import Plus from "./components/Plus/Plus.svelte";
import Check from "./components/Check/Check.svelte";
import EllipsisVertical from "./components/EllipsisVertical/EllipsisVertical.svelte";
import Trash from "./components/Trash/Trash.svelte";
import CircleCheck from "./components/CircleCheck/CircleCheck.svelte";
import Briefcase from "./components/Briefcase/Briefcase.svelte";
import LogOut from "./components/LogOut/LogOut.svelte";

export const icons = {
    plus: Plus,
    check: Check,
    ellipsisVertical: EllipsisVertical,
    trash: Trash,
    circleCheck: CircleCheck,
    briefcase: Briefcase,
    logOut: LogOut
} as const;
