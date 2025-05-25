import { ExtendedMail } from "../types"
import { APIResponse } from "../types/services"
import { mailFetch } from "./mail"

/**
 * Request to get all the mails (paginated only)
 */
type PaginatedMail = {
  "first": number,
  "prev": number | null,
  "next": number | null,
  "last": number,
  "pages": number,
  "items": number,
  "data": ExtendedMail[]
}

export const getPaginatedMails = async (
  page: number,
  perPage = 10
): Promise<APIResponse<PaginatedMail>> => {
  const result = { data: null, error: null } as APIResponse<PaginatedMail>

  // Try to fetch the emails
  try {
    const resp = await mailFetch(`/?_page=${Math.max(1, page)}&_per_page=${perPage}`)
    console.log(resp.url)
    if (resp.ok) {
      result.data = await resp.json()
      return result
    }
    // Else, throw the error and return no data
    throw new Error("Error while fetching the data: " + resp.statusText)
  } catch (error) {
    result.error = error as Error
    return result
  }
}

export const getMailFromID = async (
  mailId: string
): Promise<APIResponse<ExtendedMail>> => {
  const result = { data: null, error: null } as APIResponse<ExtendedMail>

  // Try to fetch the email
  try {
    const resp = await mailFetch(`/${mailId}`)
    console.log(resp.url)
    if (resp.ok) {
      result.data = await resp.json()
      return result
    }
    // Else, throw the error and return no data
    throw new Error("Error while fetching the data: " + resp.statusText)
  } catch (error) {
    result.error = error as Error
    return result
  }
} 