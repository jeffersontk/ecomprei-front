import react from 'react'
import { motion } from "framer-motion";

interface LayoutProps {
  children: react.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <motion.div
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 300, opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
    style={{width: '100%'}}
  >
    {children}
  </motion.div>
);
export default Layout;