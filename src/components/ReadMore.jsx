import React from "react";
import ModalWrapper from "./ModalWrapper.jsx";

export const ReadMore = ({ isOpen, onClose, article }) => {
    if (!article) return null;

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <div style={styles.modal}>

                {/* Close */}
                <button onClick={onClose} style={styles.closeBtn}>✕</button>

                {/* Image */}
                {article.image && (
                    <div style={styles.imageWrap}>
                        <img
                            src={article.image}
                            alt={article.title}
                            style={styles.image}
                        />
                        <div style={styles.imageOverlay} />
                    </div>
                )}

                {/* Content */}
                <div style={styles.content}>

                    <div style={styles.meta}>
                        <span style={styles.badge}>{article.type}</span>
                        <span style={styles.date}>
                            {new Date(article.id).toDateString()}
                        </span>
                    </div>

                    <h1 style={styles.title}>{article.title}</h1>

                    <div style={styles.author}>
                        By <span>{article.author}</span>
                    </div>

                    <p style={styles.excerpt}>{article.excerpt}</p>

                    <div style={styles.divider} />

                    <div style={styles.body}>
                        {article.content}
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};


const styles = {
    modal: {
        width: "90vw",
        maxWidth: 880,
        maxHeight: "90vh",
        background: "linear-gradient(180deg,#121212,#0c0c0c)",
        borderRadius: 18,
        overflow: "hidden",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
    },

    closeBtn: {
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 10,
        background: "rgba(0,0,0,0.6)",
        border: "none",
        width: 36,
        height: 36,
        borderRadius: "50%",
        color: "#fff",
        fontSize: 18,
        cursor: "pointer",
    },

    imageWrap: {
        position: "relative",
        height: 320,
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },

    imageOverlay: {
        position: "absolute",
        inset: 0,
        background:
            "linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.85))",
    },

    content: {
        padding: 28,
        maxHeight: "calc(90vh - 320px)",
        overflowY: "auto",
    },

    meta: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
    },

    badge: {
        background: "#fbbc12",
        color: "#000",
        padding: "4px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        textTransform: "uppercase",
    },

    date: {
        fontSize: 12,
        color: "#aaa",
    },

    title: {
        fontSize: 28,
        fontWeight: 700,
        lineHeight: 1.3,
        marginBottom: 10,
    },

    author: {
        fontSize: 14,
        color: "#bbb",
        marginBottom: 16,
    },

    excerpt: {
        fontSize: 16,
        color: "#ddd",
        lineHeight: 1.6,
    },

    divider: {
        height: 1,
        background: "#2a2a2a",
        margin: "24px 0",
    },

    body: {
        fontSize: 15,
        color: "#ccc",
        lineHeight: 1.8,
        whiteSpace: "pre-line",
    },
};
