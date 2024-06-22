import {ZodError} from "zod";
import {fail} from "@sveltejs/kit";

type TFormErrors = Record<string, string[]>

export const generateFormError = (errors: TFormErrors) => ({
    errors
})

type TZodError = Record<string, string | number>

interface IThrowZodFormError {
    status: number;
    zodError: ZodError<TZodError>
    formDataFields?: Record<string, FormDataEntryValue | null>
}

export const throwZodFormError = ({
    status,
    zodError,
    formDataFields
}: IThrowZodFormError) => {
    const errors = zodError.flatten().fieldErrors

    return fail(status, {
        ...(formDataFields ? formDataFields : {}),
        errors
    })
}

interface IThrowFormError {
    status: number;
    errors: TFormErrors
    formDataFields?: Record<string, FormDataEntryValue | null>
}

export const throwFormError = ({ status, errors, formDataFields }: IThrowFormError) => (
    fail(status, {
        ...(formDataFields ? formDataFields : {}),
        errors
    })
)
