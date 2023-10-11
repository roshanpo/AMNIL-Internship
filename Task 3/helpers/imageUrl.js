const ImageUrl = (req, imageFileName) => {
    const url = req.protocol + '://' + req.get('host');
    return url + '/images/' + imageFileName;
}

module.exports = { ImageUrl };