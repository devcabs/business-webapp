// backend/src/middleware/logger.js
import morgan from "morgan";

const logger = morgan("dev"); // logs: GET /items 200 20ms

export default logger;