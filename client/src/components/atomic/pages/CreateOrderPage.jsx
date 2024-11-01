import { useEffect } from "react";
import { Order } from "../templates/Order/Order";
import { Footer } from "../templates/Footer/Footer";
import { OrderPageHeader } from "../templates/OrderHeader/OrderPageHeader";

export const CreateOrderPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); 

    return (
        <div>
            <OrderPageHeader />
            <Order />
            <Footer />
        </div>
    );
};
