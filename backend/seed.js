import mongoose from "mongoose";
import dotenv from "dotenv";
import { Course } from "./models/course.model.js";
import { Admin } from "./models/admin.model.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing courses
    await Course.deleteMany({});
    console.log("Cleared existing courses");

    // Create a default admin id (or use an existing one)
    const adminId = new mongoose.Types.ObjectId();

    // Sample courses
    const sampleCourses = [
      {
        title: "JavaScript Mastery",
        description: "Learn JavaScript from basics to advanced concepts. Master ES6+, async programming, DOM manipulation, and more. Perfect for beginners and intermediate developers.",
        price: 999,
        image: {
          public_id: "courseapp/javascript",
          url: "https://via.placeholder.com/300x200?text=JavaScript+Mastery",
        },
        creatorId: adminId,
      },
      {
        title: "React.js Complete Guide",
        description: "Master React.js with hooks, context API, and state management. Learn to build scalable, production-ready applications with modern React patterns and best practices.",
        price: 1299,
        image: {
          public_id: "courseapp/react",
          url: "https://via.placeholder.com/300x200?text=React.js+Guide",
        },
        creatorId: adminId,
      },
      {
        title: "Node.js & Express API Development",
        description: "Build powerful backend applications with Node.js and Express. Learn REST APIs, authentication, database integration, and deployment strategies.",
        price: 1199,
        image: {
          public_id: "courseapp/nodejs",
          url: "https://via.placeholder.com/300x200?text=Node.js+APIs",
        },
        creatorId: adminId,
      },
      {
        title: "MongoDB & Database Design",
        description: "Learn MongoDB, data modeling, indexing, and optimization. Understand how to design efficient databases for scalable applications.",
        price: 899,
        image: {
          public_id: "courseapp/mongodb",
          url: "https://via.placeholder.com/300x200?text=MongoDB",
        },
        creatorId: adminId,
      },
      {
        title: "Tailwind CSS - Modern Styling",
        description: "Master utility-first CSS with Tailwind. Learn responsive design, component creation, and advanced customization for modern web applications.",
        price: 699,
        image: {
          public_id: "courseapp/tailwind",
          url: "https://via.placeholder.com/300x200?text=Tailwind+CSS",
        },
        creatorId: adminId,
      },
      {
        title: "Full Stack Web Development",
        description: "Complete full-stack course covering frontend (HTML, CSS, JavaScript, React) and backend (Node.js, Express, MongoDB). Build complete projects from scratch.",
        price: 2999,
        image: {
          public_id: "courseapp/fullstack",
          url: "https://via.placeholder.com/300x200?text=Full+Stack",
        },
        creatorId: adminId,
      },
    ];

    // Insert courses
    const createdCourses = await Course.insertMany(sampleCourses);
    console.log(`${createdCourses.length} courses seeded successfully`);

    // Display created courses
    console.log("\nSeeded Courses:");
    createdCourses.forEach((course) => {
      console.log(`- ${course.title} (₹${course.price})`);
    });

    await mongoose.connection.close();
    console.log("\nDatabase seeded and connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
