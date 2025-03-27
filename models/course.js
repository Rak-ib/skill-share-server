const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    user: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User", 
          required: true 
        },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    language: { type: String, required: true },
    level: { type: String, required: true },
    duration: { type: String, required: true },
    startingDate: {type:Date, required:true},
    endingDate: {type: Date, required:true},
    rating: { type: Number, default: 0 },
    total_enrolled: { type: Number, default: 0 },
    thumbnail_url: { type: String, required: true },
    preview_video_url: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

    instructor: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        mobile: { type: String, required: true },
        email: { type: String, required: true },
        bio: { type: String, required: true },
        profile_picture: { type: String, required: true },
        social_links: {
            linkedin: { type: String },
            twitter: { type: String },
            website: { type: String }
        }
    },

    curriculum: [
        {
            module_id: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String },
            videos: [
                {
                    video_id: { type: String, required: true },
                    title: { type: String, required: true },
                    duration: { type: String, required: true },
                    video_url: { type: String, required: true },
                    preview_available: { type: Boolean, default: false }
                }
            ]
        }
    ],

    resources: [
        {
            resource_id: { type: String, required: true },
            title: { type: String, required: true },
            file_url: { type: String, required: true }
        }
    ],

    faq: [
        {
            question: { type: String, required: true },
            answer: { type: String, required: true }
        }
    ],

    buyers: [
        {
            buyer_id: { type: String, required: true },
            name: { type: String, required: true },
            email: { type: String, required: true },
            purchase_date: { type: Date, default: Date.now },
            progress: { type: Number, default: 0 },
            completed_modules: [{ type: String }],
            reviews: {
                rating: { type: Number, default: 0 },
                comment: { type: String }
            }
        }
    ]
});

module.exports = mongoose.model('Course', CourseSchema);
