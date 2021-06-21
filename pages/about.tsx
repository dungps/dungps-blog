import React from 'react';
import PageLayout from '../layouts/PageLayout';

const About = () => {
    return (
        <PageLayout title='About me'>
            <p>Xin chào các bạn, mình là <strong>Kevin Pham</strong></p>
            <p>Hiện tại mình đang là một Fullstack Developer cho một Công ty trong lĩnh vực E-Commerce. Trong những năm tháng bận rộn, một ngày đẹp trời mình mong muốn có một cái Blog nho nhỏ của riêng mình và được tạo ra từ những cái mình học được 😄</p>
            <br />
            <p>Về trang blog:</p>
            <p>Đây sẽ là blog mình viết về những câu chuyện nhỏ bé trong chính cuộc đời của mình, cách mình chữa lành bản thân, chia sẻ cách sống healthy, yêu thương. Biết đâu những bài viết của mình lại có thể giúp được cho ai đó 😁</p>
        </PageLayout>
    );
};

export default About;
