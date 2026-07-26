"use client";

import { useEffect, useState } from "react";
import ThreadLibraryCard from "../../components/ThreadLibraryCard";

import Navbar from "../../components/Navbar";

export default function ThreadLibrary() {

    const [threads, setThreads] = useState([]);

    useEffect(() => {

        fetch("https://threadcraft-ai-1.onrender.com/library")
            .then((res) => res.json())
            .then((data) => setThreads(data))
            .catch((err) => console.log(err));

    }, []);

    return (
         <div className="page">

            <Navbar />

        <div className="library-page">

            <h1>📁 Saved Threads</h1>

            <p>
                All your generated Twitter/X threads in one place.
            </p>

            <div className="library-grid">

                {threads.map((item, index) => (

                    <ThreadLibraryCard
                        key={index}
                        thread={item.thread}
                        date={item.created}
                    />

                ))}

            </div>

            </div>

   </div>

);

}