const sheetId = '10h9WEo_-mEJz-ICPh-aIvN3_tAHwmna11U4hC7AcYz4'; // Replace with your Google Sheet ID
const apiKey = 'AIzaSyB51Ie9QLRFpYMBFfdhx0kdcOfcGUiXrZw'; // Replace with your Google API Key
const sheetRange = 'Sheet1!A1:D'; // Specify the range of cells to fetch

async function fetchSheetData() {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`);
        const data = await response.json();
        displayData(data.values);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('content').innerHTML = '<p>Error loading data. Please try again later.</p>';
    }
}
async function fetchTotalAmount() {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!E1?key=${apiKey}`);
        const data = await response.json();
        document.getElementById("cell-value").innerText = data.values[0][0];
        fetchLastUpdatedTime();
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('content').innerHTML = '<p>Error loading data. Please try again later.</p>';
    }
}


async function fetchLastUpdatedTime() {
    try {
        const response = await fetch(`https://www.googleapis.com/drive/v3/files/${sheetId}?fields=modifiedTime&key=${apiKey}`);
        const data = await response.json();

        if (data.modifiedTime) {
            const lastUpdated = new Date(data.modifiedTime);
            const timeDifference = getTimeDifference(lastUpdated, new Date());
            document.getElementById("last-updated").innerText = `Last Update - ${timeDifference}`;
            console.log("TIme");
        }
    } catch (error) {
        console.error('Error fetching last updated time:', error);
    }
}

// Helper function to calculate the time difference
function getTimeDifference(lastUpdated, current) {
    const diffMs = current - lastUpdated;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else {
        return `just now`;
    }
}

fetchTotalAmount();