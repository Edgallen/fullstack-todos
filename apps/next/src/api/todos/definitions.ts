import {z} from "zod";

export interface ITodoErrors {
    text?: string[];
}

export interface ITodoFormState {
    errors?: ITodoErrors;
}

export const TodoFormSchema = z.object({
    text: z.coerce.string().min(1,  `You can't create empty task`),
})
