const router = require("express").Router();
const articleRoutes = require("./articles");

// Book routes
router.use("/article", articleRoutes);

module.exports = router;