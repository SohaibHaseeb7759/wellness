const specificAdvice = ({ categories, focusAreas }) => {
  const advice = [];

  if (categories.includes("Health")) {
    advice.push(
      "Maintain a balanced diet to support overall health. Ensure you get adequate sleep and stay hydrated by drinking at least 8 glasses of water daily. Regular check-ups with your healthcare provider can help catch potential health issues early."
    );
  }

  if (categories.includes("Fitness")) {
    if (focusAreas.includes("Cardio")) {
      advice.push(
        "Incorporate at least 30 minutes of cardio exercise into your daily routine. Activities such as brisk walking, running, cycling, or swimming can improve cardiovascular health and boost endurance. Aim for at least 150 minutes of moderate-intensity or 75 minutes of high-intensity cardio each week."
      );
    }
    if (focusAreas.includes("Strength")) {
      advice.push(
        "Strength training exercises can help build muscle and improve metabolism. Include exercises like squats, deadlifts, bench presses, and rows in your routine. Aim for at least two days of strength training per week, allowing for muscle recovery between sessions."
      );
    }
    if (focusAreas.includes("Flexibility")) {
      advice.push(
        "Include stretching exercises to enhance flexibility and prevent injuries. Yoga and Pilates are excellent for improving flexibility and balance. Spend at least 10-15 minutes stretching after your workouts to maintain muscle elasticity and joint health."
      );
    }
  }

  if (categories.includes("Nutrition")) {
    if (focusAreas.includes("Diet")) {
      advice.push(
        "Focus on a balanced diet rich in fruits, vegetables, and lean proteins. Limit processed foods, added sugars, and unhealthy fats. Consider portion control and eating smaller, more frequent meals throughout the day to maintain energy levels and support metabolic health."
      );
    }
  }

  if (categories.includes("Mental Well-being")) {
    if (focusAreas.includes("Stress Management")) {
      advice.push(
        "Practice mindfulness and stress-relief techniques such as meditation or yoga. Establish a daily relaxation routine to manage stress effectively. Deep breathing exercises, progressive muscle relaxation, and journaling can also help alleviate stress. Ensure you make time for hobbies and activities you enjoy."
      );
    }
  }

  return advice;
};

module.exports = { specificAdvice };
