import React, { useContext, useState } from "react";
import axios from "axios";
import TodoList from "./TodoList";
import { AuthContext } from "../../provider/AuthProvider";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const Task = ({ addTodo }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null); // State to store the selected file
  const { user } = useContext(AuthContext);

  const handleAddTodo = async () => {
    if (!text.trim() || !file) {
      // Check if the input is empty or no file is selected
      return; // Don't proceed if the input is invalid
    }

    try {
      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append("image", file);

      // Make a POST request to the image hosting service to upload the image
      const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
      const response = await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      });

      const imgResponse = await response.json();

      if (imgResponse.success) {
        const imgURL = imgResponse.data.display_url;

        // Create a newTodo object with the image URL
        const newTodo = {
          text,
          photoURL: user.photoURL,
          image: imgURL,
          // Add any other properties you need for your todo
        };

        // Update the UI with the new todo immediately
        addTodo(newTodo);

        // Now make the API request to add the todo to the server
        const apiResponse = await axios.post("https://blogs-server-seven.vercel.app/api/todos", newTodo);

        // Handle a successful API response if needed
        console.log("Todo added successfully:", apiResponse.data);

        setText("");
        setFile(null); // Reset the selected file after adding the todo
      } else {
        // Handle the case where the image upload was not successful
        console.error("Image upload failed:", imgResponse.error.message);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error adding Todo:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleFileChange = (e) => {
    // Handle file input change and set the selected file in state
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="border border-gray-300 rounded px-2 py-1 w-full"
          placeholder="Add a new Todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          type="file"
          onChange={handleFileChange} // Call handleFileChange when a file is selected
        />
        <button
          className={`bg-blue-500 text-white px-3 py-1 rounded ${
            !text.trim() || !file ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleAddTodo}
          disabled={!text.trim() || !file}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
};

export default Task;
