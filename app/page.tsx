"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


const images: string[] = [
  "https://i.ytimg.com/vi/ukwWT50TZcw/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AHUBoAC4AOKAgwIABABGFMgRShyMA8=&rs=AOn4CLDrZ1CfI7uEhvBRBu4BviZm3BoX4Q",
  "https://www.sahyadri.edu.in/_next/image?url=%2Fimages%2Fstudents%2Flaunchpads.jpg&w=1920&q=75",
  "https://www.sahyadri.edu.in/_next/image?url=%2Fimages%2Fhome%2Fcollegeaerial.jpg&w=3840&q=75",
];

export default function Home() {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="carousel">
        <img
          src={images[currentImage]}
          alt="Campus View"
          className="carousel-image"
        />
      </div>

      <nav className="navbar">
        <h2 className="navbar-title">
          Sahyadri College of Engineering & Management
        </h2>
        <div className="nav-links">
          <a href="https://www.sahyadri.edu.in/home">Home</a>
          <a href="https://www.sahyadri.edu.in/vision-and-mission">About</a>
          <a href="https://www.sahyadri.edu.in/contact">Contact Us</a>
        </div>
      </nav>

      <div className="dashboard-content">
        <h1 className="dashboard-title">Welcome to the Dashboard</h1>
        <p className="dashboard-subtitle">Select a role to proceed</p>
        <button className="btn-primary" onClick={() => router.push('/auth/Login')}>
          Get Started
        </button>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SAHYADRI COLLEGE OF ENGINEERING & MANAGEMENT</h3>
            <p>An Autonomous Institution, Mangaluru</p>
          </div>
          <div className="footer-section">
            <h4>Phone</h4>
            <p>+91 824 2277222/333</p>
            <p>+91 94498 45959</p>
          </div>
          <div className="footer-section">
            <h4>Email</h4>
            <p>sahyadri@sahyadri.edu.in</p>
            <p>principal@sahyadri.edu.in</p>
          </div>
          <div className="footer-section">
            <h4>Address</h4>
            <p>Sahyadri Campus, Adyar, Mangaluru</p>
            <p>Karnataka, India - 575007</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          position: relative;
          font-family: "Arial", sans-serif;
          text-align: center;
        }
        .carousel {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 1s ease-in-out;
        }
        .navbar {
          position: absolute;
          top: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.8);
          padding: 20px;
          text-align: center;
          color: white;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-links a {
          margin: 0 15px;
        }
        .dashboard-content {
          background: rgba(173, 216, 230, 0.4);
          padding: 3rem;
          border-radius: 10px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          max-width: 500px;
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .btn-primary {
          background: #007bff;
          color: white;
          border: none;
          padding: 14px 24px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 6px;
          transition: all 0.3s;
        }
        .btn-primary:hover {
          background: #0056b3;
        }
        .footer {
          margin-top: auto;
          width: 100%;
          background: #1a1a2e;
          color: white;
          padding: 20px 0;
          text-align: center;
        }
        .footer-content {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
