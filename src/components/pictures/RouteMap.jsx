import { useState, useEffect } from 'react';
import axios from 'axios';


// eslint-disable-next-line react/prop-types
const RouteMap = ({ routeId, className }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [enlarged, setEnlarged] = useState(false);

    useEffect(() => {
        const fetchRouteMap= async () => {
            try {
                const response = await axios.get(`http://localhost:8080/routes/${routeId}/picture`, {
                    responseType: 'blob',
                });
                const newImageUrl = URL.createObjectURL(response.data);
                setImageUrl(newImageUrl);
            } catch (err) {
                console.error("Kan afbeelding niet ophalen");
            }
        };

        fetchRouteMap();
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [routeId]);

    const toggleEnlarged = () => {
        setEnlarged(!enlarged);
    };

    return (
        <div>
            {imageUrl ? (
                <img src={imageUrl} alt="Route"

                     className={`${className} route-image ${enlarged ? 'enlarged' : ''}`}
                     onClick={toggleEnlarged}/>
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};

export default RouteMap;