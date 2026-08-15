export async function get_workout_data() {
    try {
        // Load the workout data json
        const res = await fetch(`/projects/workouts/assets/data/workouts.json`);
        const data = await res.json();

        // Find workout title
        const workoutInfo = data.workout_info;
        // Get the workout data
        const workoutData = data.workout_data;

        return {
            workout_info: workoutInfo,
            workout_data: workoutData
        };
    } catch (error) {
        console.error(error);
        return [];
    }
}
