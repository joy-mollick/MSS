// ========================= Before return =========================

import React, { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, XCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import AppDownloadStrip from "../components/common/AppDownloadStrip";
import Stars from "../components/common/Stars";
import { accountBusiness, mockQuoteRequests } from "../data/mockData";
import ConfirmModal from "../components/common/ConfirmModal";
import NiceModal from "../components/common/NiceModal";

const QuotesPage = () => {

    const [niceModal, setNiceModal] = useState({
        open: false,
        type: "info",
        title: "",
        message: "",
        onPrimary: null,
    });

    const showNiceModal = ({ type = "info", title, message, onPrimary }) => {
        setNiceModal({
            open: true,
            type,
            title,
            message,
            onPrimary: onPrimary || null,
        });
    };

    const closeNiceModal = () => {
        setNiceModal({
            open: false,
            type: "info",
            title: "",
            message: "",
            onPrimary: null,
        });
    };


    const [confirmModal, setConfirmModal] = useState({
        open: false,
        action: "",
    });

    const openQuoteConfirm = (action) => {
        setConfirmModal({
            open: true,
            action,
        });
    }

    const handleQuoteAction = () => {
        const actionText = confirmModal.action === "accept" ? "accepted" : "declined";

        setConfirmModal({
            open: false,
            action: "",
        });

        showNiceModal({
            type: "success",
            title: confirmModal.action === "accept" ? "Quote Accepted" : "Quote Declined",
            message: `Quote ${actionText}. Firebase update will be connected later.`,
        });
    };

    const location = useLocation();

    const startTab = new URLSearchParams(location.search).get("tab") || "received";

    const [activeTab, setActiveTab] = useState(startTab);
    const [selectedQuote, setSelectedQuote] = useState(mockQuoteRequests[0]);

    const quotes = useMemo(() => {
        return mockQuoteRequests.filter((item) => item.type === activeTab);
    }, [activeTab]);

    return (
        // ========================= Inside return =========================

        <div className="quotesPage">
            <section className="quotesTop">
                <div className="nwlbContainer">
                    <h1>Quotes</h1>

                    <div className="quotesTabs">
                        <button
                            className={activeTab === "received" ? "active" : ""}
                            onClick={() => {
                                setActiveTab("received");
                                setSelectedQuote(mockQuoteRequests.find((q) => q.type === "received"));
                            }}
                        >
                            Quotes Received
                        </button>

                        <button
                            className={activeTab === "sent" ? "active" : ""}
                            onClick={() => {
                                setActiveTab("sent");
                                setSelectedQuote(mockQuoteRequests.find((q) => q.type === "sent"));
                            }}
                        >
                            Quotes Sent
                        </button>
                    </div>
                </div>
            </section>

            <section className="quotesMainSection">
                <div className="nwlbContainer quotesGrid">
                    <div className="quoteListPanel">
                        {quotes.map((item) => (
                            <button
                                key={item.id}
                                className={
                                    selectedQuote?.id === item.id
                                        ? "quoteListItem active"
                                        : "quoteListItem"
                                }
                                onClick={() => setSelectedQuote(item)}
                            >
                                <strong>{item.title}</strong>
                                <span>{item.businessName}</span>
                                <p>{item.status}</p>
                            </button>
                        ))}
                    </div>

                    {selectedQuote && (
                        <div className="quoteReceivedCard">
                            <h2>
                                {activeTab === "received" ? "Quote Received" : "Quote Sent"}
                            </h2>

                            <div className="quoteBusinessTop">
                                <img src={accountBusiness.image} alt={accountBusiness.name} />

                                <div>
                                    <h3>{selectedQuote.businessName}</h3>

                                    <div className="quoteRatingLine">
                                        <Stars rating={selectedQuote.rating} size={24} />
                                        <span>({selectedQuote.rating}.0)</span>
                                    </div>
                                </div>
                            </div>

                            <p className="quoteDescription">{accountBusiness.description}</p>

                            <div className="quoteDetailsGrid">
                                <div className="quotePriceBox">
                                    <h4>QUOTE DETAILS</h4>

                                    {selectedQuote.details.map((item) => (
                                        <div key={item.label} className="quotePriceRow">
                                            <span>{item.label}</span>
                                            <strong>£{item.price}</strong>
                                        </div>
                                    ))}

                                    <div className="quoteTotalRow">
                                        <span>Total</span>
                                        <strong>£{selectedQuote.total}</strong>
                                    </div>
                                </div>

                                <div className="quoteNoteBox">
                                    <h4>NOTES FROM TRADESMAN</h4>
                                    <p>{selectedQuote.note}</p>
                                </div>
                            </div>

                            <div className="quoteValidBox">
                                <span>
                                    <CalendarDays size={18} />
                                    Valid Until
                                </span>

                                <strong>{selectedQuote.validUntil}</strong>
                            </div>

                            {activeTab === "received" ? (

                                <div className="quoteDecisionRow">
                                    <button className="declineBtn" onClick={() => openQuoteConfirm("decline")}>
                                        <XCircle size={18} />
                                        Decline
                                    </button>

                                    <button className="acceptBtn" onClick={() => openQuoteConfirm("accept")}>
                                        <CheckCircle2 size={18} />
                                        Accept Quote
                                    </button>
                                </div>

                            ) : (
                                <div className="quoteDecisionRow">
                                    <button className="acceptBtn fullWidth">
                                        {selectedQuote.status}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <AppDownloadStrip />
            <ConfirmModal
                open={confirmModal.open}
                type={confirmModal.action === "accept" ? "success" : "warning"}
                title={confirmModal.action === "accept" ? "Accept Quote?" : "Decline Quote?"}
                message={
                    confirmModal.action === "accept"
                        ? "Are you sure you want to accept this quote? The tradesman will be notified."
                        : "Are you sure you want to decline this quote? This action will be saved."
                }
                confirmText={
                    confirmModal.action === "accept" ? "Yes, Accept" : "Yes, Decline"
                }
                cancelText="Cancel"
                onCancel={() =>
                    setConfirmModal({
                        open: false,
                        action: "",
                    })
                }
                onConfirm={handleQuoteAction}
            />
            <NiceModal
                open={niceModal.open}
                type={niceModal.type}
                title={niceModal.title}
                message={niceModal.message}
                primaryText="OK"
                onClose={closeNiceModal}
                onPrimary={niceModal.onPrimary || closeNiceModal}
            />
        </div>
    );
};

export default QuotesPage;