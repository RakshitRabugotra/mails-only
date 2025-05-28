import AsyncStorage from "@react-native-async-storage/async-storage"

const STORE_KEY = "backend-uri"

/**
 * Updates the user backendUri by saving them to AsyncStorage.
 *
 * @param {string} backendUri - The user backendUri to be saved.
 * @returns {Promise<{error: Error | null}>} A promise that resolves to an object containing an error if one occurred, or null if the operation was successful.
 *
 * @throws {Error} If there is an issue with saving the backendUri to AsyncStorage.
 */
export const updateBackendUri = async (backendUri: string) => {
  const result: { error: Error | null } = { error: null }
  try {
    await AsyncStorage.setItem(STORE_KEY, JSON.stringify(backendUri))
  } catch (error) {
    console.error("Error saving user backendUri")
    result.error = error as Error
  }
  return result
}

/**
 * Retrieves user backendUri from AsyncStorage.
 *
 * @returns {Promise<{backendUri: string; error: Error | null}>}
 * A promise that resolves to an object containing user backendUri and an error if any occurred.
 *
 * @async
 * @function
 */
export const getBackendUri = async () => {
  const result: { backendUri: string; error: Error | null } = {
    backendUri: "https://mock-mails.onrender.com",
    error: null,
  }
  try {
    const response = await AsyncStorage.getItem(STORE_KEY)
    if (!response || response === null) {
      return result
    }
    // Else return the response
    result.backendUri = JSON.parse(response)
  } catch (error) {
    console.error("Error getting user backendUri")
    result.error = error as Error
  }
  return result
}
