const Course = require('../models/course');



exports.createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            price,
            language,
            level,
            duration,
            startingDate,
            endingDate,
            banner,
            introductionVideo,
            syllabus,
            instructors,
            sections,
            user
        } = req.body;

        // Validate required fields
        if (!title || !description || !category || !price || !language || !level || 
            !duration || !startingDate || !endingDate || !banner || !user) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Map the instructors array to the schema structure
        const instructor = instructors && instructors.length > 0 ? {
            id: user, // Using the user ID as instructor ID
            name: instructors[0].name || 'Unknown Instructor',
            mobile: instructors[0].mobile || 'Not provided',
            email: instructors[0].email || 'no-email@example.com',
            bio: instructors[0].bio || 'No bio provided',
            profile_picture: instructors[0].image || '',
            social_links: {
                linkedin: instructors[0].social_links?.linkedin || '',
                twitter: instructors[0].social_links?.twitter || '',
                website: ''
            }
        } : {
            id: user,
            name: 'Unknown Instructor',
            mobile: 'Not provided',
            email: 'no-email@example.com',
            bio: 'No bio provided',
            profile_picture: '',
            social_links: {
                linkedin: '',
                twitter: '',
                website: ''
            }
        };

        // Map the sections to curriculum
        const curriculum = sections.map((section, index) => ({
            module_id: `mod_${Date.now()}_${index}`,
            title: section.title || `Module ${index + 1}`,
            description: section.description || '',
            videos: section.videos.map((video, vidIndex) => ({
                video_id: `vid_${Date.now()}_${index}_${vidIndex}`,
                title: video.title || `Video ${vidIndex + 1}`,
                duration: video.duration || '0',
                video_url: video.url || '',
                preview_available: false
            }))
        }));

        // Map resources (using syllabus as the only resource in this case)
        const resources = syllabus ? [{
            resource_id: `res_${Date.now()}`,
            title: 'Course Syllabus',
            file_url: syllabus
        }] : [];

        // Create the new course
        const newCourse = new Course({
            user,
            title,
            description,
            category,
            price,
            language,
            level,
            duration,
            startingDate: new Date(startingDate),
            endingDate: new Date(endingDate),
            thumbnail_url: banner,
            preview_video_url: introductionVideo,
            instructor,
            curriculum,
            resources
        });

        // Save the course
        await newCourse.save();

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            course: newCourse
        });

    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating course',
            error: error.message
        });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses' });
    }
};