const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dokqfsu1w",
    api_key: "264339326873411",
    api_secret: "C19TzqMnVHT4z-LljcAppVdDdtU"
});


module.exports = {
    async obtenerVideo(){
        const options = {
            resource_type: 'video'
        };
          
        const result = await cloudinary.search
            .expression('resource_type:video')
            .with_field('context')
            .sort_by('created_at', 'desc')
            .max_results(30)
            .execute();

        console.log(result.resources[0].context);
        return result.resources[0].url;
    }
}


