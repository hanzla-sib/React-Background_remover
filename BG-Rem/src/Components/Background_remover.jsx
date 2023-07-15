import { useState } from 'react';
import 'tailwindcss/tailwind.css';

const BackgroundRemover = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [removedImageUrl, setRemovedImageUrl] = useState('');

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image_file', file);

        try {
            const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: {
                    'X-Api-Key': 'MtPJGtf1Ejz11c2GxXcqupqo', // Replace with your Remove.bg API key
                },
                body: formData,
            });

            if (response.ok) {
                const blob = await response.blob();
                const imageURL = URL.createObjectURL(blob);
                setRemovedImageUrl(imageURL);
                setImageUrl(URL.createObjectURL(file));
            } else {
                console.error('Error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col items-center mt-8">
            <h1 className="text-2xl font-bold mb-4">Background Removal</h1>
            <div className="mb-4">
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
            <div className='flex flex-row space-x-10'>
            {imageUrl && (
                <div className='border  w-[300px]'>
                    <h2 className="text-xl font-bold mb-2 text-center">Original Image</h2>
                    <img
                        src={imageUrl}
                        alt="Original"
                        className="w-full h-auto mb-4 rounded-lg shadow"
                    />
                </div>
            )}
            {removedImageUrl && (
                <div className='border  w-[300px]'>
                    <h2 className="text-xl font-bold mb-2 text-center ">Background Removed Image</h2>
                    <img
                        src={removedImageUrl}
                        alt="Background Removed"
                        className="w-full-auto mb-4 rounded-lg shadow"
                    />
                </div>
            )}
            </div>
           
        </div>
    );
};

export default BackgroundRemover;
