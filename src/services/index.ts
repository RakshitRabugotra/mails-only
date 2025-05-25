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
      `/?_page=${Math.max(1, page)}&_per_page=${perPage}`
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

export const getMailFromID = async (
  mailId: string
): Promise<APIResponse<ExtendedMail>> => {
  const result: APIResponse<ExtendedMail> = { data: null, error: null }

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

/**
 * Update the mail
 */
export const updateMailFromID = async (
  mailId: string,
  newMail: ExtendedMail
): Promise<APIErrorResponse> => {
  const result: APIErrorResponse = { error: null }

  try {
    const resp = await mailFetch(`/${mailId}`, {
      method: "PUT",
      body: JSON.stringify(newMail),
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
    if(error) throw error;
    // Set the data
    result.data = mail;
    // Send the signal to delete the mail
    const resp = await mailFetch(`/${mailId}`, {
      method: "DELETE"
    })
    if (!resp.ok) throw new Error("Error updating the mail-id: " + mailId)
  } catch (error) {
    result.error = error as Error
  }
  return result
}