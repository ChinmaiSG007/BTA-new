/**
 * Google Sheets form submission utility.
 *
 * Usage:
 *   import { submitToSheets } from "../utils/submitToSheets";
 *   await submitToSheets({ sheet: "tours", name: "...", ... });
 *
 * The `sheet` field tells the Apps Script which tab to write to:
 *   - "tours"   → Sheet 1 (Tour Enquiries)
 *   - "contact" → Sheet 2 (Contact & Custom)
 */

// ──────────────────────────────────────────────
// ⚠️  REPLACE THIS URL after deploying your Apps Script
// ──────────────────────────────────────────────
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzRpqZ42niufM72OxOaRESVdvT39zL92sNhL9bFUeb2DePoXJ0fJjORQV9pk1xBmSTK/exec";

/**
 * Generate the current date-time string in IST.
 */
function getISTDateTime() {
  const now = new Date();
  return now.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

/**
 * Submit form data to Google Sheets via the deployed Apps Script.
 *
 * @param {Object} data  – key/value pairs to send.
 *                         Must include a `sheet` key ("tours" | "contact").
 * @returns {Promise<boolean>} resolves `true` on success, `false` on failure.
 */
export async function submitToSheets(data) {
  try {
    const formData = new FormData();

    // Append IST timestamp automatically
    formData.append("datetime", getISTDateTime());

    // Append every field the caller passed in
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value ?? "");
    });

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: formData,
    });

    // Google Apps Script returns opaque responses in no-cors mode,
    // so we treat any non-error as success.
    return response.ok || response.type === "opaque";
  } catch (error) {
    console.error("[submitToSheets] Error:", error);
    return false;
  }
}
