import mongoose, { Schema } from 'mongoose';

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const Course = mongoose.model('Course', CourseSchema);
export default Course;
