// Google Sheet
import { google } from 'googleapis'
const sheets = google.sheets('v4')

const serviceAccount = require('../sheets_updater_service_account.json')

const jwtClient = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

const jwtAuthPromise = jwtClient.authorize()

export async function exportUsers(
    date: string,
    fullName: string,
    isFullyLoggedIn: boolean,
    shirtSize: string,
    school: string,
    specialAccomadations: string,
    phone: string,
    graduationYear: string,
    latino: boolean,
    ethnicity: string, 
    gender: string,
    studyLevel: string
) {

    const finalData: Array<Array<string>> = [];
    const singleUser: Array<any> = [date, fullName, isFullyLoggedIn, shirtSize, school,
                                    specialAccomadations, phone, graduationYear,
                                    latino, ethnicity, gender, studyLevel];
    finalData.push(singleUser);

    await jwtAuthPromise
    await sheets.spreadsheets.values.append({
        auth: jwtClient,
        spreadsheetId: "1wgcZXAwsjCeThdHn0EYZv5Osj_51E2Efe7gU25MDmtQ",
        range: `Sheet1!A1:Z1`,
        valueInputOption: 'RAW',
        requestBody: { values: finalData, majorDimension: "ROWS" }
    }, {})

}