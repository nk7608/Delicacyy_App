import React from 'react';
import Veggie from '../components/Veggie';
import { motion } from "framer-motion";
import Random from '../components/Random';



function Home() {
  return (
    <motion.div>
      <Veggie />
<Random />
    </motion.div>
  )
}

export default Home;