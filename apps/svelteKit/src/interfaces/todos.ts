import { z } from "zod";

export interface ITodoErrors {
    text?: string[];
}

export interface ITodoFormState {
    text: string;
    errors?: ITodoErrors;
}

export const TodoFormSchema = z.object({
    text: z.coerce.string().min(1,  `You can't create empty task`),
});

export const UpdateTodoSchema = z.object({
    id: z.coerce.number(),
    status: z.coerce.string()
});

export const DeleteTodoSchema = UpdateTodoSchema.omit({ status: true });
