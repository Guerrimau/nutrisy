import "babel-polyfill";

export const fileUpload = async (file) => {


    const cloudUrl = 'https://api.cloudinary.com/v1_1/dblwegpaz/upload';

    let formData = new FormData();
    formData.append('upload_preset','nutrisy');
    formData.append('file', file);

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            return null;
        }
    } catch (err) {
        throw err;
    }
}