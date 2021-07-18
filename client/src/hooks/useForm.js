import { useState, React } from 'react';
const useForm = (initialState = {}) => {
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e) => {
        if (e.target.type == "file") {
            setFormData({
                ...formData, [e.target.name]: {
                    name: e.target.value,
                    file: e.target.files[0]
                }
            })
        }
        else
            setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return { formData, handleInputChange };
}
export default useForm;