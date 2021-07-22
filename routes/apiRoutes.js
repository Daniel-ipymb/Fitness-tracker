const router = require("express").Router();
const db = require("../models");


router.post("/api/workouts", async (req,res) => {
  const createdWorkout = await db.Workout.create({})
  console.log(createdWorkout)
  res.json(createdWorkout)
})

router.put("/api/workouts/:id", async (req,res) => {
  const updatedWorkout = await db.Workout.findByIdAndUpdate(req.params.id, {
    $push: {
      exercises: req.body
    },
  },{new:true})
  res.json(updatedWorkout)
  console.log(updatedWorkout)
})

router.get("/api/workouts/range", async (req,res) => {
  const allWorkouts = await db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {$sum: "$exercises.duration"}
      }
    }
  ]).sort({_id:-1}).limit(7)
  console.log(allWorkouts)
  res.json(allWorkouts)
});

router.get("/api/workouts", async (req,res) => {
  const allWorkouts = await db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {$sum: "$exercises.duration"}
      }
    }
  ])
  console.log(allWorkouts)
  res.json(allWorkouts)
});

module.exports = router;