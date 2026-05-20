/**
 * Builds the API base URL.
 *
 * Uses VITE_CODESPACE_NAME when defined (see .env.local):
 *   https://<codespace-name>-8000.app.github.dev
 *
 * Falls back to http://localhost:8000 when VITE_CODESPACE_NAME is not set,
 * to avoid broken URLs like https://undefined-8000.app.github.dev.
 */
const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl =
  codespaceName && codespaceName.trim() !== ''
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'

/**
 * Fetches a resource from the API and returns the data array.
 * Compatible with both plain array responses and paginated { data: [...] } shapes.
 */
export async function fetchResource(path) {
  const response = await fetch(`${apiBaseUrl}${path}`)
  if (!response.ok) throw new Error(`API error ${response.status}: ${path}`)
  const json = await response.json()
  // Handle paginated { data: [...] } and plain array responses
  return Array.isArray(json) ? json : (json.data ?? [])
}
