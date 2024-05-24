import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../pages/mtbRentalPage/RentalPage.css'


// eslint-disable-next-line react/prop-types
const MtbPicture = ({ mountainbike }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchMtbPicture = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/mountainbikes/${mountainbike.id}/picture`, {
                    responseType: 'blob',
                });
                const newImageUrl = URL.createObjectURL(response.data);
                setImageUrl(newImageUrl);
            } catch (err) {
                console.error("Kan afbeelding niet ophalen");
            }
        };

        fetchMtbPicture();

        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [mountainbike]);

    return (
        <div>
            {imageUrl ? (
                // eslint-disable-next-line react/prop-types
                <img src={imageUrl} alt={`Mountainbike ${mountainbike.id}`} />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};

export default MtbPicture;