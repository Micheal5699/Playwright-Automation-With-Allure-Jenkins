import { promises as fs } from 'fs';
import * as path from 'path';

export default async function globalTeardown() {

const filesToDelete = [
    'login-setup.json',
    'login-token.json',
    'login-token.json.response.json'
];


   
for (const file of filesToDelete) {
    const filePath = path.join(__dirname, file);
    try {
        await fs.unlink(filePath);
        console.log(`${file} deleted successfully.`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log(`${file} does not exist, nothing to delete.`);
        } else {
            console.error(`Error deleting ${file}:`, err);
        }
    }
}
}
globalTeardown();