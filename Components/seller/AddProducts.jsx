"use client"
import React from 'react'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
const AddProducts = (id) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string()
          .required('Name is required')
          .max(50, 'Name must be less than 50 characters'),
        description: Yup.string()
          .required('Description is required')
          .max(500, 'Description must be less than 500 characters'),
        price: Yup.number()
          .required('Price is required')
          .typeError('Price must be a number')
          .positive('Price must be a positive number'),
        category: Yup.string()
          .required('Category is required'),
        brand: Yup.string()
          .required('Brand is required'),
        stock: Yup.number()
          .required('Stock is required')
          .typeError('Stock must be a number')
          .integer('Stock must be an integer')
          .min(0, 'Stock must be 0 or more'),
          image: Yup.mixed().required("image required")
      });

      const { register, handleSubmit, setValue, formState: { errors } } = useForm({
          resolver: yupResolver(validationSchema),
        });
      
        // const onSubmit = async(data) => {
        // //   console.log('Form data:', data)
        // const seller_id = id.id;
        //   const payload = { seller_id, ...data };
        //   try {
        //     const response = await fetch("http://localhost:8000/products", {
        //       method: "POST", // Specify the HTTP method
        //       headers: {
        //         "Content-Type": "application/json", // Indicate that you're sending JSON data
        //       },
        //       body: JSON.stringify(payload), // Convert the data object to a JSON string
        //     });
        
        //     // Check if the response is okay (status in the range 200-299)
        //     if (!response.ok) {
        //       throw new Error(`HTTP error! Status: ${response.status}`);
        //     }
        
        //     // Parse the JSON response
        //     const result = await response.json();
        //     console.log("Response data:", result);
        //   } catch (error) {
        //     console.error("Error during POST request:", error);
        //   }
        // };

        const onSubmit = async (data) => {
          const seller_id = id.id;
          const formData = new FormData();
        
          // Append the other form data
          formData.append('seller_id', seller_id);
          Object.keys(data).forEach(key => {
            if (key === 'image') {
              // Handle file separately
              formData.append('images', data[key]); // 'images' is the key expected by your backend
            } else {
              formData.append(key, data[key]);
            }
          });
        
          try {
            const response = await fetch("http://localhost:8000/products", {
              method: "POST",
              body: formData, // FormData is directly passed in the body
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const result = await response.json();
            console.log("Response data:", result);
          } catch (error) {
            console.error("Error during POST request:", error);
          }
        };


        const handleFileChange = (e) => {
          setValue('image', e.target.files[0]);
          console.log("file", e.target.files[0])
        };

  return (
    <div>
           <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea
          id="description"
          {...register('description')}
          className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
        <input
          id="price"
          type="number"
          {...register('price')}
          className={`w-full px-3 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
        <input
          id="category"
          type="text"
          {...register('category')}
          className={`w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="brand" className="block text-gray-700 font-bold mb-2">Brand</label>
        <input
          id="brand"
          type="text"
          {...register('brand')}
          className={`w-full px-3 py-2 border ${errors.brand ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="stock" className="block text-gray-700 font-bold mb-2">Stock</label>
        <input
          id="stock"
          type="number"
          {...register('stock')}
          className={`w-full px-3 py-2 border ${errors.stock ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
      </div>
      <div className='mb-4'>
      <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image</label>
        <input
          id="image"
          type="file"
          onChange={handleFileChange}
          className={`w-full px-3 py-2 border ${errors.stock ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
    </div>
  )
}
export default AddProducts