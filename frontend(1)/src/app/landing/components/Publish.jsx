"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";


export default function Publish(){

return(

<section className="publish" id="publish">


<div className="section-title">

<span>🚀 Publish Anywhere</span>


<h2>
Generate Threads.
<br/>
Post Directly To X.
</h2>


<p>
ThreadCraft creates, optimizes and publishes your content without leaving the platform.
</p>


</div>



<motion.div

className="publish-box"

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:0.7
}}

>


<div className="publish-left">


<div className="x-icon">

<Icon icon="simple-icons:x"/>

</div>


<h3>
One Click X Publishing
</h3>


<p>
Connect your X account and publish AI-generated threads instantly.
No copy paste. No switching tabs.
</p>


<button>

🚀 Publish Thread

</button>


</div>



<div className="publish-right">


<div className="post-card">


<div className="post-header">

🚀 ThreadCraft AI

</div>


<p>

"5 AI tools that will change productivity forever..."

</p>


<div className="post-footer">

❤️ 2.4K   💬 392   🔁 841

</div>


</div>


</div>


</motion.div>


</section>

)

}