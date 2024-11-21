import { useState } from 'react';
import { AdminCategoryManagement } from '../../templates/AdminPage/AdminCategoryManagement/AdminCategoryManagement';
import { AdminPriceManagement } from '../../templates/AdminPage/AdminPriceManagement/AdminPriceManagement';
import { AdminUserManagement } from '../../templates/AdminPage/AdminUserManagement/AdminUserManagement';
import { AdminMarqueeManagement } from '../../templates/AdminPage/AdminMarqueeManagement/AdminMarqueeManagement';
import { AdminUpdateProducts } from '../../templates/AdminPage/AdminUpdateProducts/AdminUpdateProducts';
import { AdminDeliveryPriceManagement } from '../../templates/AdminPage/AdminDeliveryPriceManagement/AdminDeliveryPriceManagement';
import './AdminPage.css';

export const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("categories");

    const renderContent = () => {
        switch (activeTab) {
            case "categories":
                return <AdminCategoryManagement />;
            case "products":
                return <AdminUpdateProducts />;
            case "price":
                return <AdminPriceManagement />;
            case "users":
                return <AdminUserManagement />;
            case "marquee":
                return <AdminMarqueeManagement />;
            case 'delivery':
                return <AdminDeliveryPriceManagement />
            default:
                return null;
        }
    };

    return (
        <div className="admin-page">
            <div className="sidebar-menu">
                <h2>Меню</h2>
                <ul>
                    <li
                        className={activeTab === "categories" ? "active" : ""}
                        onClick={() => setActiveTab("categories")}
                    >
                        Категорії
                    </li>
                    <li
                        className={activeTab === "products" ? "active" : ""}
                        onClick={() => setActiveTab("products")}
                    >
                        Товари
                    </li>
                    <li
                        className={activeTab === "price" ? "active" : ""}
                        onClick={() => setActiveTab("price")}
                    >
                        Мінімальна ціна
                    </li>
                    <li
                        className={activeTab === "delivery" ? "active" : ""}
                        onClick={() => setActiveTab("delivery")}
                    >
                        Ціна доставки
                    </li>
                    <li
                        className={activeTab === "users" ? "active" : ""}
                        onClick={() => setActiveTab("users")}
                    >
                        Користувачі
                    </li>
                    <li
                        className={activeTab === "marquee" ? "active" : ""}
                        onClick={() => setActiveTab("marquee")}
                    >
                        Біжучий рядок
                    </li>
                </ul>
            </div>
            <div className="content-area">
                {renderContent()}
            </div>
        </div>
    );
};
