// ========================= Before return =========================

import React from "react";
import {
    Building2,
    Edit3,
    Eye,
    FileText,
    LogOut,
    Plus,
    Quote,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppDownloadStrip from "../components/common/AppDownloadStrip";
import { accountBusiness, mockQuoteRequests } from "../data/mockData";
import ConfirmModal from "../components/common/ConfirmModal";

const AccountDashboardPage = () => {
    const navigate = useNavigate();

    const receivedQuotes = mockQuoteRequests.filter(
        (item) => item.type === "received"
    );

    const sentQuotes = mockQuoteRequests.filter((item) => item.type === "sent");

    const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);

    const logout = () => {
        localStorage.removeItem("nwlb_logged_in");
        window.dispatchEvent(new Event("nwlb_auth_change"));
        navigate("/");
    };

    return (
        // ========================= Inside return =========================

        <div className="accountPage">
            <section className="accountHero">
                <div className="accountHeroOverlay" />

                <div className="nwlbContainer accountHeroContent">
                    <div>
                        <h1>
                            North West <br />
                            Local Business
                        </h1>
                        <p>{accountBusiness.address}</p>
                    </div>

                    <div className="accountLogoCircle">
                        <img src="/assets/logo-blue.png" alt="NWLB" />
                    </div>
                </div>
            </section>

            <section className="accountMainSection">
                <div className="nwlbContainer">
                    <div className="accountSummaryGrid">
                        <div className="accountQuoteBox">
                            <h2>Quote List</h2>

                            <div className="quoteMiniRow">
                                <span>{receivedQuotes[0]?.customerName || "No quote"}</span>

                                <strong>{receivedQuotes[0]?.status || "No Status"}</strong>

                                <button onClick={() => navigate("/quotes?tab=received")}>
                                    <Eye size={18} />
                                    View
                                </button>
                            </div>
                        </div>

                        <div className="accountQuoteBox">
                            <h2>My Sent Quotes</h2>

                            <div className="quoteMiniRow">
                                <span>{sentQuotes[0]?.businessName || "No sent quote"}</span>

                                <strong>{sentQuotes[0]?.status || "No Status"}</strong>

                                <button onClick={() => navigate("/quotes?tab=sent")}>
                                    <Eye size={18} />
                                    View
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="businessListBlock">
                        <h2>Business List</h2>

                        <button
                            className="businessListRow"
                            onClick={() => navigate(`/listing/${accountBusiness.id}`)}
                        >
                            <span>{accountBusiness.name}</span>
                            <span>{accountBusiness.postcode}</span>
                            <span>{accountBusiness.distance}</span>
                        </button>
                    </div>

                    <button
                        className="addNewBusinessBtn"
                        onClick={() => navigate("/add-listing")}
                    >
                        <Plus size={18} />
                        Add New Business
                    </button>

                    <div className="accountActionList">
                        <button onClick={() => navigate(`/edit-listing/${accountBusiness.id}`)}>
                            <span>
                                <Edit3 size={16} />
                                Edit Listing
                            </span>
                            <Edit3 size={15} />
                        </button>

                        <button onClick={() => navigate("/quotes?tab=received")}>
                            <span>
                                <Quote size={16} />
                                Quotes Received
                            </span>
                            <Edit3 size={15} />
                        </button>

                        <button onClick={() => navigate("/quotes?tab=sent")}>
                            <span>
                                <FileText size={16} />
                                Quotes Sent
                            </span>
                            <Edit3 size={15} />
                        </button>

                        <button onClick={() => navigate("/add-listing")}>
                            <span>
                                <Building2 size={16} />
                                Add / Manage Business
                            </span>
                            <Edit3 size={15} />
                        </button>
                    </div>

                    <div className="accountStatsGrid">
                        <div>
                            <h3>Monthly</h3>
                            <p>6</p>
                        </div>

                        <div>
                            <h3>Clicks</h3>
                            <p>22</p>
                        </div>

                        <div>
                            <h3>Seen</h3>
                            <p>40</p>
                        </div>

                        <div>
                            <h3>Favorited</h3>
                            <p>5</p>
                        </div>

                        <div>
                            <h3>Calls</h3>
                            <p>4</p>
                        </div>
                    </div>

                    <div className="logoutWrap">
                        <button onClick={() => setLogoutModalOpen(true)}>
                            <LogOut size={17} />
                            Logout
                        </button>

                    </div>
                </div>
            </section>

            <ConfirmModal
                open={logoutModalOpen}
                title="Logout Account?"
                message="Are you sure you want to logout from your NWLB account?"
                confirmText="Yes, Logout"
                cancelText="Stay Logged In"
                onCancel={() => setLogoutModalOpen(false)}
                onConfirm={logout}
            />

            <AppDownloadStrip />
        </div>
    );
};

export default AccountDashboardPage;