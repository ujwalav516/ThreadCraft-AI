"use client";

import { useState } from "react";

export default function ThreadLibraryCard({ thread, date }) {

    const [showModal, setShowModal] = useState(false);

    return (

        <>
            <div className="library-card">

                <h2>📁 Generated Thread</h2>

                <p className="thread-date">
                    {date}
                </p>

                <div className="thread-preview">

                    <pre>
                        {thread.substring(0, 320)}...
                    </pre>

                </div>

                <button
                    className="read-btn"
                    onClick={() => setShowModal(true)}
                >
                    📖 Read Full Thread
                </button>

            </div>

            {showModal && (

                <div
                    className="thread-modal"
                    onClick={() => setShowModal(false)}
                >

                    <div
                        className="thread-modal-box"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            className="close-btn"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>

                        <h2>📖 Full Thread</h2>

                        <div className="modal-content">

                            <pre>
                                {thread}
                            </pre>

                        </div>

                    </div>

                </div>

            )}

        </>

    );

}