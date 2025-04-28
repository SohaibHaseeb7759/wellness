const generatePersonalizedAdvice = (profile) => {
  const advice = [];
  console.log(profile);

  // Age-based advice
  if (profile.age < 30) {
    advice.push(
      "At your age, it's beneficial to incorporate strength training into your routine to build muscle mass and improve bone density. Aim for at least two days of strength training per week, focusing on all major muscle groups. Additionally, ensure you're getting enough protein to support muscle growth."
    );
    advice.push(
      "Consider high-intensity interval training (HIIT) for cardiovascular health. HIIT can help you burn more calories in a shorter amount of time and improve your heart health."
    );
  } else if (profile.age >= 30 && profile.age < 50) {
    advice.push(
      "Focus on cardiovascular exercises like running, cycling, or swimming to maintain heart health and stamina. Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity each week."
    );
    advice.push(
      "Balanced nutrition is crucial. Ensure you're consuming a variety of fruits, vegetables, lean proteins, and whole grains. Consider incorporating healthy fats from sources like avocados, nuts, and olive oil."
    );
  } else {
    advice.push(
      "Low-impact exercises such as walking, yoga, and tai chi are recommended to maintain flexibility, balance, and overall well-being. Aim for at least 30 minutes of physical activity most days of the week."
    );
    advice.push(
      "Strength training is still important even at an older age. Focus on lighter weights with higher repetitions to maintain muscle mass and bone density. Consider working with a fitness professional to ensure proper form and prevent injury."
    );
  }

  // Gender-specific advice
  if (profile.gender === "female" && profile.age >= 50) {
    advice.push(
      "Bone health is crucial, so incorporate strength training exercises to maintain bone density. Include weight-bearing exercises like walking, jogging, and resistance training in your routine."
    );
    advice.push(
      "Ensure you're getting enough calcium and vitamin D through diet or supplements to support bone health. Foods rich in calcium include dairy products, leafy green vegetables, and fortified foods."
    );
  }

  // Wellness goals
  if (profile.wellnessGoals && profile.wellnessGoals.includes("weight loss")) {
    advice.push(
      "For effective weight loss, maintain a calorie deficit by consuming fewer calories than you burn. Focus on a balanced diet rich in whole foods, lean proteins, and plenty of fruits and vegetables."
    );
    advice.push(
      "Regular exercise is key. Combine cardiovascular exercises with strength training to maximize fat loss while preserving muscle mass. Consider working with a fitness professional to create a personalized workout plan."
    );
    advice.push(
      "Keep a food journal to track your intake and identify patterns that may be hindering your weight loss. Stay hydrated and avoid sugary drinks."
    );
  }

  if (profile.wellnessGoals && profile.wellnessGoals.includes("muscle gain")) {
    advice.push(
      "Focus on strength training exercises that target all major muscle groups. Aim for at least two days of strength training per week, gradually increasing the weights and resistance as you progress."
    );
    advice.push(
      "Ensure you're consuming enough protein to support muscle growth. Include sources like lean meats, fish, dairy, beans, and legumes in your diet."
    );
    advice.push(
      "Consider working with a fitness professional to develop a personalized strength training program that aligns with your goals."
    );
  }

  if (profile.wellnessGoals && profile.wellnessGoals.includes("flexibility")) {
    advice.push(
      "Incorporate stretching exercises and activities like yoga or Pilates into your routine. These exercises help improve flexibility and reduce the risk of injury."
    );
    advice.push(
      "Aim to stretch all major muscle groups at least three times a week. Hold each stretch for 20-30 seconds without bouncing to avoid injury."
    );
    advice.push(
      "Consider joining a class or following a guided routine to ensure you're performing stretches correctly and effectively."
    );
  }

  // Health conditions
  if (profile.healthCondition === "hypertension") {
    advice.push(
      "Monitor your sodium intake by avoiding processed foods and limiting salt in your diet. Aim for no more than 2,300 milligrams of sodium per day, or less if recommended by your healthcare provider."
    );
    advice.push(
      "Engage in regular aerobic activity, such as brisk walking, swimming, or cycling, for at least 150 minutes per week. Regular exercise can help lower blood pressure and improve heart health."
    );
    advice.push(
      "Consider stress-reducing activities like yoga, meditation, or deep breathing exercises. Chronic stress can contribute to high blood pressure, so finding ways to manage stress is important."
    );
  }

  if (profile.healthCondition === "diabetes") {
    advice.push(
      "Maintain stable blood sugar levels by eating a balanced diet with a focus on whole grains, lean proteins, and plenty of vegetables. Avoid high-sugar and high-fat foods."
    );
    advice.push(
      "Engage in regular physical activity to help manage blood sugar levels. Both aerobic exercises and resistance training are beneficial."
    );
    advice.push(
      "Monitor your blood sugar levels regularly and follow your healthcare provider's recommendations for medication and lifestyle changes."
    );
  }

  if (profile.healthCondition === "anxiety") {
    advice.push(
      "Incorporate relaxation techniques into your daily routine, such as deep breathing exercises, meditation, or yoga. These practices can help reduce anxiety levels and promote a sense of calm."
    );
    advice.push(
      "Engage in regular physical activity, which can help alleviate symptoms of anxiety. Activities like walking, running, and swimming can release endorphins and improve mood."
    );
    advice.push(
      "Maintain a healthy diet rich in whole foods, lean proteins, and plenty of fruits and vegetables. Avoid caffeine and sugar, which can exacerbate anxiety symptoms."
    );
  }

  if (profile.healthCondition === "asthma") {
    advice.push(
      "Identify and avoid triggers that can cause asthma attacks, such as allergens, smoke, and pollution. Keep your living environment clean and well-ventilated."
    );
    advice.push(
      "Engage in regular, moderate physical activity to strengthen your respiratory system. Choose activities that are less likely to trigger symptoms, such as swimming or walking."
    );
    advice.push(
      "Work with your healthcare provider to create an asthma action plan. This plan should include information on how to manage symptoms, use medications, and handle emergencies."
    );
  }

  if (profile.healthCondition === "arthritis") {
    advice.push(
      "Engage in low-impact exercises such as swimming, cycling, and walking to maintain joint mobility and reduce stiffness. Avoid high-impact activities that can exacerbate joint pain."
    );
    advice.push(
      "Incorporate strength training exercises to support the muscles around your joints, which can help reduce the strain on them."
    );
    advice.push(
      "Consider working with a physical therapist to develop an exercise program tailored to your specific needs and limitations."
    );
  }

  if (profile.healthCondition === "heart disease") {
    advice.push(
      "Follow a heart-healthy diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats. Avoid foods high in saturated fats, trans fats, cholesterol, and sodium."
    );
    advice.push(
      "Engage in regular aerobic exercise, such as walking, cycling, or swimming, to improve cardiovascular health. Aim for at least 150 minutes of moderate-intensity exercise per week."
    );
    advice.push(
      "Monitor your blood pressure, cholesterol levels, and weight regularly. Follow your healthcare provider's recommendations for managing your condition, including taking prescribed medications."
    );
  }

  return advice;
};

module.exports = { generatePersonalizedAdvice };
