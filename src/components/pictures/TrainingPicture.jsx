import {useEffect, useState} from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const TrainingPicture = ({ training, trainingId}) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchTrainingPicture = async () => {
            try {

                const response = await axios.get(`http://localhost:8080/trainings/${trainingId}/picture`, {
                    responseType: 'blob',
                });
                const newImageUrl = URL.createObjectURL(response.data);
                setImageUrl(newImageUrl);
            } catch (err) {
                console.error("No picture found for training", err);
            }
        };

        fetchTrainingPicture();

        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [training, trainingId]);

    return (
        <div>
            {imageUrl ? (
                <img src={imageUrl} alt={`Training ${trainingId}`} />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};

export default TrainingPicture;