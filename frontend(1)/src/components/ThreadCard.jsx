"use client";

import { useState } from "react";

export default function ThreadCard({ thread }) {

    const [showModal, setShowModal] = useState(false);

    return (

        <div className="thread-card">

            <h2>📁 Generated Thread</h2>

            <p className="thread-date">
                {thread.created}
            </p>

            <div className="thread-preview">

                <pre>
                    {thread.thread.substring(0, 320)}...
                </pre>

            </div>

            <button
                className="read-btn"
                onClick={() => setShowModal(true)}
            >
                📖 Read Full Thread
            </button>

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
                                {thread.thread}
                            </pre>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}