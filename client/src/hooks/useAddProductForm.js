import { useState } from "react";

export const useAddProductForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        offerPrice: "",
    });

    const [images, setImages] = useState([null, null, null, null]);

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = file;
            setImages(newImages);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = { ...formData, images };
        console.log("Submitted Product Data:", productData);

        // 🔄 Reset form if needed
        // setFormData({...})
        // setImages([...])
    };

    return {
        formData,
        images,
        handleInputChange,
        handleImageChange,
        handleSubmit,
    };
};
