import { ExtendedMail } from "../types"
import { APIErrorResponse, APIResponse } from "../types/services"
import { mailFetch } from "./mail"

/**
 * Request to get all the mails (paginated only)
 */
type PaginatedMail = {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: ExtendedMail[]
}

export const getPaginatedMails = async (
  page: number,
  perPage = 10
): Promise<APIResponse<PaginatedMail>> => {
  const result: APIResponse<PaginatedMail> = { data: null, error: null }

  // Try to fetch the emails
  try {
    const resp = await mailFetch(
      `/mails?_page=${Math.max(1, page)}&_per_page=${perPage}`
    )
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

/**
 * Search the mails
 */
export interface SearchResults {
  total: number
  data: ExtendedMail[]
}

export const searchMailsFromText = async (
  query: string
): Promise<APIResponse<SearchResults>> => {
  const result: APIResponse<SearchResults> = { data: null, error: null }

  // Try to fetch the result from backend
  try {
    const resp = await mailFetch(`/search?q=${query.toLowerCase()}`)
    if (resp.ok) {
      result.data = await resp.json()
      return result
    }
    // Else, throw the error and return no data
    throw new Error(
      `Error while search for the mail (query=${query}) status: ` +
        resp.statusText
    )
  } catch (error) {
    result.error = error as Error
    return result
  }
}

/**
 * Get the mail from the id
 */

export const getMailFromID = async (
  mailId: string
): Promise<APIResponse<ExtendedMail>> => {
  const result: APIResponse<ExtendedMail> = { data: null, error: null }

  // Try to fetch the email
  try {
    const resp = await mailFetch(`/mails/${mailId}`)
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

/**
 * Update the mail
 */
export const updateMailFromID = async (
  mailId: string,
  newMail: Partial<Omit<ExtendedMail, "id">>
): Promise<APIErrorResponse> => {
  const result: APIErrorResponse = { error: null }
  console.log("body:", newMail)
  try {
    const resp = await mailFetch(`/mails/${mailId}`, {
      method: "PUT",
      body: JSON.stringify(newMail),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!resp.ok) throw new Error("Error updating the mail-id: " + mailId)
  } catch (error) {
    result.error = error as Error
  }
  return result
}

/**
 * Delete the mail
 */
export const deleteMailFromID = async (
  mailId: string
): Promise<APIResponse<ExtendedMail>> => {
  const result: APIResponse<ExtendedMail> = { data: null, error: null }

  try {
    // First get the mail we're trying to delete
    const { data: mail, error } = await getMailFromID(mailId)
    // Throw the error if so
    if (error) throw error
    // Set the data
    result.data = mail
    // Send the signal to delete the mail
    const resp = await mailFetch(`/mails/${mailId}`, {
      method: "DELETE",
    })
    if (!resp.ok) throw new Error("Error updating the mail-id: " + mailId)
  } catch (error) {
    result.error = error as Error
  }
  return result
}