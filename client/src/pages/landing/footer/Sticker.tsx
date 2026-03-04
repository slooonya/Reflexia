import { motion } from "motion/react";

import './Sticker.css';

export function Sticker({ src, className, rotation }){
  return (
    <motion.img src={src} className={`sticker ${className}`} drag dragElastic={0.6} dragSnapToOrigin whileTap={{ scale: 1.05, cursor: "grabbing" }} dragTransition={{ bounceStiffness: 200, bounceDamping: 15 }} initial={{ rotate: rotation }} whileDrag={{ rotate: rotation + 4 }}/>
  );
}