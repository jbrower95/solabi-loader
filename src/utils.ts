
export const assertValidJSON = (contents: string) => {
    try {
        JSON.parse(contents);
    } catch (err) {
        throw new Error(`invalid .abi.json file -- expected valid JSON (${err})`);
    }
}
