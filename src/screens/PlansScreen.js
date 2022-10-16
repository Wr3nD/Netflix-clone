import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import db, { auth } from "../firebase";
import "./PlansScreen.css";
import { selectUser } from "../features/UserSlice";
import { loadStripe } from "@stripe/stripe-js";
const PlansScreen = () => {
    const [products, setProducts] = useState([]);
    const [subscription, setSubscription] = useState(null);

    const getSubscriptionsData = async () => {
        let docs = getDocs(
            collection(db, `customers/${user.uid}/subscriptions`)
        ).then((querySnapshot) => {
            querySnapshot.forEach(async (subscription) => {
                console.log(subscription);
                setSubscription({
                    role: subscription.data().role,
                    current_period_end:
                        subscription.data().current_period_end.seconds,
                    current_period_start:
                        subscription.data().current_period_start.seconds,
                });
            });
        });
    };

    let array = [];
    const user = useSelector(selectUser);

    const getMePrices = async (productDoc) => {
        let priceOfProducts = await getDocs(
            collection(db, `products/${productDoc.id}/prices`)
        );
        await priceOfProducts.forEach((price) => {
            array[productDoc.id].prices = {
                priceId: price.id,
                priceData: price.data(),
            };
        });
        return priceOfProducts;
    };

    const info2 = async () => {
        const q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            array[doc.id] = doc.data();
            getMePrices(doc);
        });
        setProducts(array);
    };

    const loadCheckout = async (priceId) => {
        const docRef = await addDoc(
            collection(db, `customers/${user.uid}/checkout_sessions`),
            {
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            }
        );
        onSnapshot(docRef, async (doc) => {
            const { error, sessionId } = doc.data();
            if (error) {
                alert(`an error occurred ${error.message}`);
            }
            if (sessionId) {
                const stripe = await loadStripe(
                    "pk_test_51LoRnMC2Wdf4qBMDWgursvohdrHBnJ67mfBZcP90mezQ40flGxoCVcgQzwpYFzrrguZvoOuVQHpBGfMIQJ2l5tj600O8fCJcYq"
                );
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };

    useEffect(() => {
        info2();
        getSubscriptionsData();
    }, []);
    console.log(subscription?.current_period_end);
    return (
        <div className="plansScreen">
            {subscription && (
                <p>
                    Renewal date :{" "}
                    {new Date(
                        subscription?.current_period_end * 1000
                    ).toLocaleDateString()}
                </p>
            )}
            {products &&
                Object?.entries(products).map(([productId, productData]) => {
                    const isCurrentPackage = productData.name?.includes(
                        subscription?.role
                    );

                    return (
                        <div
                            className={`${
                                isCurrentPackage &&
                                "plansScreen__plan--disabled"
                            } plansScreen__plan`}
                            key={productId}
                        >
                            <div className="plansScreen__info">
                                <h5>{productData?.name}</h5>
                                <h6>{productData?.description}</h6>
                            </div>
                            <button
                                onClick={() =>
                                    !isCurrentPackage &&
                                    loadCheckout(productData?.prices?.priceId)
                                }
                            >
                                {isCurrentPackage
                                    ? "Current Package"
                                    : "Subscribe"}
                            </button>
                        </div>
                    );
                })}
        </div>
    );
};

export default PlansScreen;
