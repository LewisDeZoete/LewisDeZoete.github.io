export async function get_workout_data(workout_type, workout_filename) {
    try {
        const res = await fetch(`/projects/workouts/assets/data/${workout_type}/${workout_filename}`);
        const data = await res.json();

        // 1. Find workout title
        const workoutTitle = data.workout_info.title;
        // 2. Find workout description section
        const description = data.workout_info.workout_description;
        // 3. Get the workout data
        const workoutData = data.workout_data

        return {
            title: workoutTitle,
            description:  description,
            workout_data: workoutData
        };
    } catch (error) {
        console.error(error);
        return [];
    }
}
