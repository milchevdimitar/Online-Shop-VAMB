import React, { useState } from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
    const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("darkMode")) || false);

    return (
        <div className="policies-section py-10 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-white">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {/* Easy Exchange Policy */}
                <div className="policy">
                    <img
                        src={darkMode ? assets.exchange_icon.dark : assets.exchange_icon.light}
                        alt="Easy Exchange Policy"
                        className="w-16 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold">Easy Exchange Policy</h3>
                    <p>We offer hassle-free exchange policy</p>
                </div>

                {/* 7 Days Return Policy */}
                <div className="policy">
                    <img
                        src={darkMode ? assets.quality_icon.dark : assets.quality_icon.light}
                        alt="7 Days Return Policy"
                        className="w-16 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold">7 Days Return Policy</h3>
                    <p>We provide 7 days free return policy</p>
                </div>

                {/* Best Customer Support */}
                <div className="policy">
                    <img
                        src={darkMode ? assets.support_img.dark : assets.support_img.light}
                        alt="Best Customer Support"
                        className="w-16 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold">Best Customer Support</h3>
                    <p>We provide 24/7 customer support</p>
                </div>
            </div>
        </div>
    );
};

export default OurPolicy;
