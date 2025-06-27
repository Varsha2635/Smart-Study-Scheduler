// // const { OpenAI } = require('openai');
// // require('dotenv').config();

// // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // async function generatePlan(subjects, goals, examDate, availableHours) {
// //   const response = await openai.chat.completions.create({
// //     model: 'gpt-4o',
// //     messages: [
// //       {
// //         role: 'system',
// //         content: `You are an expert study planner. Generate a detailed daily schedule based on subjects, goals, exam date, and available time.`,
// //       },
// //       {
// //         role: 'user',
// //         content: `Subjects: ${subjects.join(', ')}
// // Goals: ${goals}
// // Exam Date: ${examDate}
// // Available Hours Per Day: ${availableHours}`,
// //       },
// //     ],
// //     temperature: 0.7,
// //   });

// //   const plan = response.choices[0].message.content;
// //   return plan; // String format
// // }

// // module.exports = generatePlan;

// // const { GoogleGenerativeAI } = require("@google/generative-ai");

// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // exports.generatePlan = async (promptText) => {
// //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// //   const result = await model.generateContent(promptText);
// //   const response = result.response;
// //   return response.text();
// // };


// function generatePlan(subjects, goals, examDate, availableHoursPerDay, startDate = new Date()) {
//   const schedule = [];

//   // Calculate number of days between startDate and examDate
//   const start = new Date(startDate);
//   const end = new Date(examDate);
//   const diffTime = end - start;
//   if (diffTime <= 0) throw new Error("Exam date must be after today");
//   const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//   // Sum of all goals (used as priority weights)
//   const totalGoal = goals.reduce((sum, val) => sum + val, 0);

//   for (let day = 0; day < daysLeft; day++) {
//     const dayPlan = {};
//     for (let i = 0; i < subjects.length; i++) {
//       // Hours assigned proportional to the goal
//       const hours = (goals[i] / totalGoal) * availableHoursPerDay;
//       dayPlan[subjects[i]] = +hours.toFixed(2); // round to 2 decimals
//     }

//     schedule.push({
//       day: day + 1,
//       date: new Date(start.getTime() + day * 86400000).toISOString().split('T')[0],
//       plan: dayPlan,
//     });
//   }

//   return schedule;
// }
// module.exports = { generatePlan };


const generatePlan = (availableHours, subjectsWithDates) => {
  const today = new Date();
  const studyPlan = [];

  // Convert dates and sort
  subjectsWithDates.forEach(subject => {
    subject.examDate = new Date(subject.examDate);
    subject.remainingDays = Math.ceil((subject.examDate - today) / (1000 * 60 * 60 * 24));
  });

  // Sort by exam date
  subjectsWithDates.sort((a, b) => a.examDate - b.examDate);

  const lastExamDate = subjectsWithDates[subjectsWithDates.length - 1].examDate;

  // Create plan from today till last exam date
  for (let d = new Date(today); d <= lastExamDate; d.setDate(d.getDate() + 1)) {
    // const dateStr = d.toISOString().split('T')[0];
    // let remainingHours = availableHours;
    // const dayPlan = [];

    // for (const subject of subjectsWithDates) {
    //   if (d < subject.examDate) {
    //     const hours = Number((remainingHours * (1 / subject.remainingDays)).toFixed(2));
    //     remainingHours -= hours;
    //     dayPlan.push({ date: dateStr, subject: subject.name, hours });
    //   }
    // }

    // studyPlan.push(...dayPlan);
    const dateStr = d.toISOString().split('T')[0];
  const activeSubjects = subjectsWithDates.filter(subject => d < subject.examDate);

  const totalInverseDays = activeSubjects.reduce((sum, s) => sum + 1 / s.remainingDays, 0);

  const dayPlan = activeSubjects.map(subject => {
    const weight = (1 / subject.remainingDays) / totalInverseDays;
    const hours = Number((availableHours * weight).toFixed(2));
    return { date: dateStr, subject: subject.name, hours };
  });

  studyPlan.push(...dayPlan);
  }

  return studyPlan;
};

module.exports = generatePlan;
