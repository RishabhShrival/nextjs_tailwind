'use client';
import Image from "next/image";

export function ProductCard({ 
    id,
  image, 
  title, 
  description, 
  alt,
  className = "",
  onClick 
}) {
  return (
    <div 
      className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${className}`}
      onClick={onClick}
    >
      {/* Image Container - Full Coverage */}
      <div className="relative w-full h-64 sm:h-72 md:h-80">
        <Image
          src={image}
          alt={alt || title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
      </div>
      
      {/* Content Container - Positioned at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-sm sm:text-base text-gray-200 line-clamp-3 opacity-90">
          {description}
        </p>
      </div>
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

// Alternative variant with external text (if you prefer text outside the image)
export function ProductCardExternal({ 
  image, 
  title, 
  description, 
  alt,
  className = "",
  onClick 
}) {
  return (
    <div 
      className={`group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-white ${className}`}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
        <Image
          src={image}
          alt={alt || title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      {/* Content Container - Below Image */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
