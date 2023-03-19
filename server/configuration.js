// configuration for __dirname in ES module
import pathModule from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
export const __dirname = pathModule.dirname(__filename);
