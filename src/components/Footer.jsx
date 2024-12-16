import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-700 text-gray-300 text-center py-6 mt-8">
      <div className="mb-4">
        <p className="text-sm">
          &copy; 2024 University Competition Management Platform. All rights
          reserved.
        </p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Contact Us</p>
        <p>
          Email:{" "}
          <a
            href="mailto:support@universitycomp.com"
            className="text-blue-400 hover:underline"
          >
            eventura@universitycomp.com
          </a>
        </p>
      </div>
      <div>
        <p className="text-lg font-semibold">Follow Us</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="https://facebook.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-blue-600 transition-colors"
            title="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-blue-400 transition-colors"
            title="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-blue-700 transition-colors"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://youtube.com/c/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-red-600 transition-colors"
            title="YouTube"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
