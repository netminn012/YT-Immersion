// Cross-browser compatibility: Use browser API (works in both Chrome and Firefox)
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'CAPTURE_CURRENT_TAB') {
        
        browserAPI.tabs.captureVisibleTab(null, {format: 'jpeg', quality: 70}, (dataUrl) => {
            if (browserAPI.runtime.lastError) {
                console.error(browserAPI.runtime.lastError);
                sendResponse({ success: false, error: browserAPI.runtime.lastError.message });
            } else {
                sendResponse({ success: true, dataUrl: dataUrl });
            }
        });
        return true; 
    }
});