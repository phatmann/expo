export default {
    get name() {
        return 'ExpoClipboard';
    },
    async getStringAsync() {
        let text = '';
        try {
            text = await navigator.clipboard.readText();
        }
        catch (e) {
            try {
                // Internet Explorer
                // @ts-ignore
                text = window.clipboardData.getData('Text');
            }
            catch (e) {
                return Promise.reject(new Error('Unable to retrieve item from clipboard.'));
            }
        }
        return text;
    },
    setString(text) {
        let success = false;
        const textField = document.createElement('textarea');
        textField.textContent = text;
        document.body.appendChild(textField);
        textField.select();
        try {
            document.execCommand('copy');
            success = true;
        }
        catch (e) { }
        document.body.removeChild(textField);
        return success;
    },
    async setStringAsync(text) {
        return this.setString(text);
    },
    addClipboardListener() { },
    removeClipboardListener() { },
};
//# sourceMappingURL=ExpoClipboard.web.js.map