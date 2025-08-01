import { motion } from 'framer-motion';
import React from 'react';

export const BlogCard = ({ blog }) => {
  return (
    <motion.article
      whileHover={{ y: -10 }}
      className="bg-light-orange rounded-xl overflow-hidden shadow-lg"
    >
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <p className="text-sm text-dark-green/60">{blog.date}</p>
        <h3 className="text-xl font-semibold text-dark-green mt-2">{blog.title}</h3>
        <p className="mt-2 text-dark-green/80">{blog.excerpt}</p>
        <button className="mt-4 px-4 py-2 bg-dark-green text-light-orange rounded-lg hover:bg-dark-green/90 transition-colors">
          Read More
        </button>
      </div>
    </motion.article>
  );
};