import 'isomorphic-fetch';
import getEnv from '../../../utils/get-env';


export default async(zip) => {
    const env = getEnv();
    const zipData = await fetch(`${env.baseUrl}/api/get-nearest-zip-code-temperature-data/${zip}`)
        .then(res => res.json())
        .catch(() => {
            console.log('Failed to fetch zip data for zip', zip);
            return {error: true}
        });
    return zipData.error ? null : zipData;
};
