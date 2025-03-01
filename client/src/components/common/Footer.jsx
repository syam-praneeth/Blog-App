import React from "react";
import { motion } from "framer-motion";

function Footer() {
  // Apple's color palette
  // Primary: #000000 (Black)
  // Secondary: #f5f5f7 (Light gray/white)
  // Accent: #0066cc (Blue)
  // Text: #86868b (Gray)
  // Subtle: #d2d2d7 (Light gray)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <footer className="bg-black text-[#86868b] py-12">
      <div className="container mx-auto px-5">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h6 className="text-lg font-medium text-[#f5f5f7]">Information</h6>
            <ul className="mt-4 space-y-3">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <a href="" className="hover:text-[#0066cc] transition-colors duration-300">Pages</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <a href="" className="hover:text-[#0066cc] transition-colors duration-300">Our Team</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <a href="" className="hover:text-[#0066cc] transition-colors duration-300">Features</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <a href="" className="hover:text-[#0066cc] transition-colors duration-300">Pricing</a>
              </motion.li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h6 className="text-lg font-medium text-[#f5f5f7]">Resources</h6>
            <ul className="mt-4 space-y-3">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <a href="" className="hover:text-[#0066cc] transition-colors duration-300">Wikipedia</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <a href="" className="hover:text-[#0066cc] transition-colors duration-300">React Blog</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <a href="" className="hover:text-[#0066cc] transition-colors duration-300">Terms & Service</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <a href="" className="hover:text-[#0066cc] transition-colors duration-300">Angular Dev</a>
              </motion.li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h6 className="text-lg font-medium text-[#f5f5f7]">Help</h6>
            <ul className="mt-4 space-y-3">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <a href="" className="hover:text-[#0066cc] transition-colors duration-300">Sign Up</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <a href="" className="hover:text-[#0066cc] transition-colors duration-300">Login</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <a href="" className="hover:text-[#0066cc] transition-colors duration-300">Terms of Service</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <a href="" className="hover:text-[#0066cc] transition-colors duration-300">Privacy Policy</a>
              </motion.li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h6 className="text-lg font-medium text-[#f5f5f7]">Contact Us</h6>
            <motion.p 
              className="mt-4 text-[#86868b]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Need help? Contact us!
            </motion.p>
            <motion.p 
              className="mt-2 text-[#0066cc]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              +91 9346521315
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
      <motion.div 
        className="text-center mt-8 border-t border-[#333336] pt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-[#86868b]">2025 © Syam, All Rights Reserved</p>
      </motion.div>
    </footer>
  );
}

export default Footer;