import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { axios } = useAppContext();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return toast.error("All fields are required");
    }

    try {
      const { data } = await axios.post("/api/contact", form);
      if (data.success) {
        toast.success(data.message);
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-20">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Contact Us
      </h2>
      <div className="grid md:grid-cols-2 gap-10">
        {/* Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Get in touch</h3>
          <p className="text-gray-600">
            Have questions about your grocery delivery or want to partner with
            us? Reach out!
          </p>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-gray-800 font-medium">support@groceryhub.com</p>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="text-gray-800 font-medium">+91 98765 43210</p>
          <p className="text-sm text-gray-500">Address</p>
          <p className="text-gray-800 font-medium">
            123 Fresh Lane, Bengaluru, Karnataka, 560001
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-700">Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full p-3 h-32 border rounded-md"
              placeholder="Write your message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-6 rounded-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
