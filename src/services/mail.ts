/**
 * Ensure you have the json-server running for this
 */
const BACKEND_URI = "https://9393-2401-4900-81ec-3a16-cd53-4300-ac92-e576.ngrok-free.app/mails"

export type QueryParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined

export const mailFetch = (input: string | URL | Request, init?: RequestInit) =>
  fetch(BACKEND_URI + input, init)
