import { InjectionKey } from "vue"
import Rules from "async-validator"
import Values from "async-validator"

export type FormData = {
  model: Record<string, unknown>
  rules?: Rules
}

export type FormItem = {
  validate: () => Promise<Values>
}

export type FormType = {
  validate: (cb: (isValied: boolean) => void) => void
}

export const key: InjectionKey<FormData> = Symbol("form-data")
