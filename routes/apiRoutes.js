const router = require("express").Router();
const db = require("../models");


router.post("/api/workouts", async (req,res) => {
  const createdWorkout = await db.Workout.create(req.body)
  console.log(createdWorkout)
  res.json(createdWorkout)
})

router.put("/api/workouts/:id", async (req,res) => {
  const updatedWorkout = await db.Workout.findOneAndUpdate({_id: req.params.id}, {
    $push: {
      exercises: req.body
    }
  })
  console.log(updatedWorkout)
})

router.get("/")

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